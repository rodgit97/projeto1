const mysql = require('mysql');

let pool = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "projeto1",
});

module.exports = pool;