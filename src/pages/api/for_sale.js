import db from "../../lib/mysql"
import { format } from "sqlstring"

export default async function Add(req, res) {
    var status = [];
    try {
        const query = format(
            "SELECT inventory.id as product_id, products.photo_name, products.name, inventory.price FROM products, inventory, traders WHERE products.id = inventory.product_id and inventory.trader_id = traders.id ORDER BY inventory.grading DESC;"
        );
        status = await db.query(query);
    } catch (e) {
        console.log(e)
        status = [];
    }

    res.status(200).json(status);
}