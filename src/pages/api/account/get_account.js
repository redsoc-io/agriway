import db from "../../../lib/mysql"
import { format } from "sqlstring"
import { getSession } from "next-auth/react";

export default async function Add(req, res) {
    var status = {};

    const session = await getSession({ req });

    try {
        const supid = JSON.parse(session.token.sub).id

        if (supid) {
            const query = format(
                "SELECT fname, lname, email, phone from `users` WHERE id = ?;",
                [supid]
            );
            const response = await db.query(query);
            if (response.error) {
                status = { error: true }
            }
            else {
                status = response[0]
            }
        }

    } catch (e) {
        console.log(e)
        status = { error: true };
    }

    res.status(200).json(status);
}