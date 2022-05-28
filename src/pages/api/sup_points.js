import db from "../../lib/mysql"
import { format } from "sqlstring"

export default async function (req, res) {

    var status = [];
    try {
        const query = format(
            "SELECT DISTINCT COUNT(*) from users, inventory, traders where users.id = traders.sup_id and traders.id = inventory.trader_id and users.id = 1;"
        );
        status = await db.query(query);
        status = status[0]["COUNT(*)"] * 5;
    } catch (e) {
        console.log(e)
        status = [];
    }

    res.status(200).json(status);
}