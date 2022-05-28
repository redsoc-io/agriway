import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "../../../lib/mysql";
const bcrypt = require("bcrypt");

var { format } = require("sqlstring");
var md5 = require("md5");

const nextauth = (req, res) =>
    NextAuth(req, res, {
        providers: [
            Credentials({
                name: "credentials",
                credentials: {
                    email: {
                        label: "Email",
                        type: "email",
                        placeholder: "someone@example.com",
                    },
                    password: { label: "Password", type: "password" },
                },
                async authorize(credentials, req) {
                    var user = {
                        name: "",
                        email: credentials.email,
                        image: `https://gravatar.com/avatar/${md5(credentials.email)}`,
                    };
                    const query = format("SELECT * FROM `users` WHERE email = ? ;", [
                        credentials.email,
                    ]);
                    try {
                        const response = await db.query(query);
                        if (response.length === 1) {
                            const userLoginStatus = await bcrypt.compare(
                                credentials.password,
                                response[0].pwd_enc
                            );
                            if (userLoginStatus) {
                                user.name = response[0].name;
                                user.id = JSON.stringify({ role: response[0].role, id: response[0].id });
                                return user;
                            } else {
                                return null;
                            }
                        } else {
                            return null;
                        }
                    } catch (e) {
                        console.log(e);
                        return null;
                    }
                },
            }),
        ],
        secret: process.env.AUTH_SECRET,
        callbacks: {
            async session(session, token) {
                return session;
            },
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            signingKey: process.env.JWT_SIGN_KEY,
        },
    });

export default nextauth;