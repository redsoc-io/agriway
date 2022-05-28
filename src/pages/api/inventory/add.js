import db from "../../../lib/mysql"
import { format } from "sqlstring"
const base64 = require("base-64");

export default async function Add(req, res) {
    var status = { success: false };
    try {
        var { newInventoryData } = req.body;
        if (newInventoryData) {
            var newInventoryData = base64.decode(newInventoryData);

            var { product_id, trader_id, product_grading, arrived_at, arrived_quantity, price } = JSON.parse(newInventoryData);


            if (product_id, trader_id, product_grading, arrived_at, arrived_quantity, price) {
                const query = format(
                    "INSERT INTO `inventory` (`trader_id`, `product_id`, `grading`, `arrived_at`, `quantity`, `price`) VALUES (?, ?, ?, ?, ?, ?);",
                    [trader_id, product_id, product_grading, arrived_at, arrived_quantity, price]
                );
                const response = await db.query(query);
                status.success = true
            }
        }

    } catch (e) {

    }

    res.status(200).json(status);
    console.log(status);
}