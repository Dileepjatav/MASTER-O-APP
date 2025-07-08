import connectDB from "../config/db.js";

export const insertUser = async (name, email, password, role) => {
  await connectDB.db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
};
