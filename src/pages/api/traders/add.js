import db from "../../../lib/mysql"
import { format } from "sqlstring"
import { getSession } from "next-auth/react";
const base64 = require("base-64");

export default async function Add(req, res) {
    var status = { success: false };

    const session = await getSession({ req });
    try {
        const supid = JSON.parse(session.token.sub).id

        var { newInventoryData } = req.body;
        if (newInventoryData) {
            var newInventoryData = base64.decode(newInventoryData);

            var { name, phone, address1, address2, locality, district, state, pincode } = JSON.parse(newInventoryData);


            if (name && phone && address1 && address2 && locality && district && state && pincode && supid) {
                const query = format(
                    "INSERT INTO `traders` (`name`, `contact`, `al_1`, `al_2`, `locality`, `district`, `state`, `pincode`, `sup_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
                    [name, phone, address1, address2, locality, district, state, pincode, supid]
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