import connectDB from "../config/db.js";

export const deleteQuestion = async (id) => {
  await connectDB.db.query("DELETE FROM questions WHERE id = ?", [id]);
};
export const deleteUser = async (id) => {
  await connectDB.db.query("DELETE FROM users WHERE id = ?", [id]);
};

export const deleteSkill = async (id) => {
  await connectDB.db.query(`DELETE FROM skill_categories WHERE id = ?`, [id]);
};

export const deleteAttempt = async (id) => {
  await connectDB.db.query(`DELETE FROM quiz_attempts WHERE id = ?`, [id]);
};
