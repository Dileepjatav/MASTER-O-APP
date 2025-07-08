import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: "",
  //   password: process.env.DB_PASSWORD || "MyNewPassword",
  database: process.env.DB_NAME || "quiz_db",
  port: process.env.DB_NAME || "3306",
  waitForConnections: true,
  queueLimit: 0,
});

const connectDB = () => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Database connection failed:", err.message);
      return;
    }
    console.log("✅ Connected to the database");
    connection.release();
  });

  const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

  db.query(createUsersTable, (err, result) => {
    if (err) console.error("❌ Table creation failed:", err);
    else console.log("✅ 'users' table created or already exists.");
  });
};

export default { db };
