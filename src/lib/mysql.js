const mysql = require("serverless-mysql");
const { ConnectionString } = require("connection-string");
require("dotenv").config();

const mysql_connection_string = process.env.MYSQL_CONN_STRING;

if (!mysql_connection_string) {
    throw new Error("Please define the MYSQL_CONN_STRING environment variable");
}

const cs = new ConnectionString(mysql_connection_string);

const user = cs.user;
const password = cs.password;
const host = cs.hostname;
const port = cs.port;
const database = cs.path[0] || "agriway";

let db = mysql({ config: { host, port, user, password, database } });

exports.query = async (query) => {
    try {
        const results = await db.query(query);
        await db.end();
        return results;
    } catch (error) {
        console.log(error);
        return { error };
    }
};