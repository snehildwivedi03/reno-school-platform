const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// Create a pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // max simultaneous connections
  queueLimit: 0,
});

// Export promise-based pool for async/await usage
module.exports = pool.promise();
