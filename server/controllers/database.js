require('dotenv').config()

const controller = {}
const mysql = require("mysql");

controller.getConnection = () => {
    let connection = mysql.createConnection({
        host:process.env.__SQL_HOST,
        user:process.env.__SQL_USER,
        password:process.env.__SQL_PASS,
    })
    return connection
}

module.exports = controller