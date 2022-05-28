import db from "../../lib/mysql"
import { format } from "sqlstring"
import { getSession } from "next-auth/react";

export default async function (req, res) {

    const session = await getSession({ req });
    var status = [];
    try {
        const supid = JSON.parse(session.token.sub).id
        const query = format(
            "SELECT DISTINCT COUNT(*) from users, inventory, traders where users.id = traders.sup_id and traders.id = inventory.trader_id and users.id = ?;",
            [supid]
        );
        status = await db.query(query);
        status = status[0]["COUNT(*)"] * 5;
    } catch (e) {
        console.log(e)
        status = [];
    }

    res.status(200).json(status);
}