import connectDB from "../config/db.js";

export const insertUser = async (name, email, password, role) => {
  await connectDB.db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role]
  );
};

export const createQuestion = async (data) => {
  const {
    skill_id,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
  } = data;

  const [result] = await connectDB.db.query(
    `INSERT INTO questions 
    (skill_id, question_text, option_a, option_b, option_c, option_d, correct_option)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      skill_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
    ]
  );

  return result;
};

export const createSkill = async ({ name, description }) => {
  const [result] = await connectDB.db.query(
    `INSERT INTO skill_categories (name, description) VALUES (?, ?)`,
    [name, description || null]
  );
  return result.insertId;
};

export const createAttempt = async ({ user_id, skill_id }) => {
  const [result] = await connectDB.db.query(
    `INSERT INTO quiz_attempts (user_id, skill_id) VALUES (?, ?)`,
    [user_id, skill_id]
  );
  return result.insertId;
};
