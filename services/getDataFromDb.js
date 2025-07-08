import dbConnect from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await dbConnect.db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const getAllUsers = async () => {
  const result = await dbConnect.db.query("SELECT * FROM users");
  return result.length > 0 ? result[0] : null;
};
