const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Database@123",
  database: "renoschoolDB",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
});

module.exports = db;
