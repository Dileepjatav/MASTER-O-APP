import fs from "fs";
import path from "path";
import connectDb from "./config/db.js"; // from mysql2/promise

const runSqlFile = async (filePath) => {
  try {
    const sql = fs.readFileSync(filePath, "utf8");
    const statements = sql.split(/;\s*$/gm); // split on semicolon

    for (const stmt of statements) {
      if (stmt.trim()) {
        await connectDb.db.query(stmt);
      }
    }

    console.log("✅ Database schema applied.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error applying schema:", err.message);
    process.exit(1);
  }
};

const file = path.resolve("quiz_db_schema.sql");
runSqlFile(file);
