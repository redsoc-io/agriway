import db from "../../../lib/mysql"
import { format } from "sqlstring"

import base64 from "base-64";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export default async function Add(req, res) {
    var status = { success: true };

    var { signUpUser } = req.body;
    if (signUpUser) {
        signUpUser = base64.decode(signUpUser);
        var { fname, lname, email, password, phone } = JSON.parse(signUpUser);
        password = await bcrypt.hash(password, saltRounds);
        console.log(password);

        const query = format(
            "INSERT INTO `users` (`email`, `pwd_enc`, `phone`, `fname`, `lname`) VALUES (?, ?, ?, ?, ?);",
            [email, password, phone, fname, lname]
        );

        const accountExists = await checkUserExists(email);
        if (!accountExists) {
            if (req.method === "POST" && fname && lname && email && password && phone) {
                const response = await db.query(query);
                console.log("response: ", response);
                if (response.error) {
                    status.success = false;
                    status.reason = "Error occoured while adding user!";
                } else {
                    status.success = true;
                }
            }
        } else {
            status.success = false;
            status.reason = "Account already exists!";
        }
    }

    res.status(200).json(status);
    console.log(status);
}

async function checkUserExists(email) {
    const query = format("SELECT * FROM `users` WHERE email = ? ;", [email]);
    const response = await db.query(query);
    return response > 0;
}