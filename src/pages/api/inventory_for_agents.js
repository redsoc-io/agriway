import db from "../../lib/mysql"
import { format } from "sqlstring"

export default async function Add(req, res) {
    var status = [];

    try {
        const query = format(
            "SELECT * FROM `products`, `inventory` WHERE products.id = inventory.product_id;"
        );
        status = await db.query(query);
    } catch (e) {
        console.log(e)
        status = [];
    }

    res.status(200).json(status);
}