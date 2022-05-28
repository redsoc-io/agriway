import db from "../../../../lib/mysql"
import { format } from "sqlstring"

export default async function Add(req, res) {
    var status = { success: false };
    try {
        const { id } = req.query

        if (id) {
            const query = format(
                "DELETE FROM `traders` WHERE `traders`.`id` = ?",
                [id]
            );
            const response = await db.query(query);
            status.success = true
        }
    } catch (e) {
    }
    res.status(200).json(status);
    console.log(status);
}