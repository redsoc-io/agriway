import db from "../../../lib/mysql"
import { format } from "sqlstring"

export default async function handler(req, res) {
    console.log(req.body)
    var { inventory_id, quantity, location } = JSON.parse(req.body);
    quantity = parseInt(quantity)
    console.log(inventory_id)
    var query_check = format("SELECT * from `inventory` where inventory.id = ?;", [inventory_id])
    console.log(query_check)
    query_check = await db.query(query_check)
    console.log(query_check)
    query_check = query_check[0]

    const product_id = query_check["product_id"]
    const trader_id = query_check["trader_id"]
    const grading = query_check["grading"]
    const quantity_def = query_check["quantity"];
    const price = query_check["price"];

    if (quantity_def >= quantity) {
        const query_update = format("UPDATE `inventory` set quantity = quantity - ? where inventory.id = ?;", [quantity, inventory_id]);
        await db.query(query_update)
        const query_insert = format("INSERT INTO `inventory` (`trader_id`, `product_id`,  `grading`, `location`, `quantity`, `price`) VALUES (?, ?, ?, ?, ?, ?);",
            [
                trader_id, product_id, grading, location, quantity, price
            ]
        );
        await db.query(query_insert)
    }
    res.status(200).json({})
}