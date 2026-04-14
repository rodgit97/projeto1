const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// const host = "localhost";
// const username = "root";
// const password = "root";
// const database = "projeto1";

// let pool = mysql.createConnection({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "projeto1",
// });
const host = "localhost";
const username = "root";
const password = "";
const database = "projeto1";
app.use(express.json());

// app.get("/path", req);

const connection = mysql.createConnection({
  host: host,
  user: username,
  password: password,
  database: database,
});
