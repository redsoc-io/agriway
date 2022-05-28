import db from "../../../lib/mysql"
import { format } from "sqlstring"

import base64 from "base-64";
const bcrypt = require("bcrypt");
const saltRounds = 10;

import { getSession } from "next-auth/react";

export default async function Add(req, res) {
    var status = { success: true };

    const session = await getSession({ req });
    try {
        var { editUser } = req.body;
        const supid = JSON.parse(session.token.sub).id
        if (editUser) {
            editUser = base64.decode(editUser);
            var { fname, lname, email, phone } = JSON.parse(editUser);

            const query = format(
                "UPDATE `users` SET `email` = ?, `fname` = ?, `lname` = ?, `phone` = ? WHERE `users`.`id` = ?",
                [email, fname, lname, phone, supid]
            );

            if (req.method === "POST" && fname && lname && email && phone && supid) {
                const response = await db.query(query);
                console.log("response: ", response);
                if (response.error) {
                    status.success = false;
                    status.reason = "Error occoured while editing user!";
                } else {
                    status.success = true;
                }
            }
        }
    } catch (e) { }

    res.status(200).json(status);
}

async function checkUserExists(email) {
    const query = format("SELECT * FROM `users` WHERE email = ? ;", [email]);
    const response = await db.query(query);
    return response > 0;
}