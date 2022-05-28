import db from "../../../lib/mysql"
import { format } from "sqlstring"
import { getSession } from "next-auth/react";

export default async function Add(req, res) {
    var status = { inventory: [] };

    const session = await getSession({ req });

    try {
        const supid = JSON.parse(session.token.sub).id

        if (supid) {
            const query = format(
                "SELECT * FROM `traders` WHERE `sup_id` = ?;",
                [supid]
            );
            status.inventory = await db.query(query);
        }

    } catch (e) {
        console.log(e)
        status = { inventory: [] };
    }

    res.status(200).json(status);
}