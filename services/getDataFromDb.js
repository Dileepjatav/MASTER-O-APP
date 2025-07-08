import dbConnect from "../config/db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await dbConnect.db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const getUserPerformance = async () => {
  const [rows] = await dbConnect.db.query(`
    SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email,
      COUNT(DISTINCT a.id) AS total_attempts,
      SUM(a.total_score) AS total_score,
      AVG(a.total_score) AS avg_score
    FROM users u
    LEFT JOIN quiz_attempts a ON u.id = a.user_id
    GROUP BY u.id
    ORDER BY total_score DESC
  `);
  return rows.length > 0 ? rows : [];
};

export const getSkillGapReport = async () => {
  const [rows] = await dbConnect.db.query(`
    SELECT 
      s.id AS skill_id,
      s.name AS skill_name,
      COUNT(a.id) AS total_attempts,
      AVG(a.total_score) AS avg_score
    FROM skill_categories s
    LEFT JOIN quiz_attempts a ON a.skill_id = s.id
    GROUP BY s.id
    ORDER BY avg_score ASC
  `);
  return rows.length > 0 ? rows : [];
};

export const getTimeBasedReport = async () => {
  const [rows] = await dbConnect.db.query(`
    SELECT 
      DATE_FORMAT(started_at, '%Y-%m') AS month,
      DATE_FORMAT(started_at, '%u') AS week_number,
      COUNT(*) AS total_attempts,
      SUM(total_score) AS total_score
    FROM quiz_attempts
    GROUP BY month, week_number
    ORDER BY month DESC, week_number DESC
  `);
  return rows.length > 0 ? rows : [];
};

export const getAllQuestions = async ({ skill_id, page, limit }) => {
  const offset = (page - 1) * limit;
  let sql = `SELECT * FROM questions`;
  const params = [];

  if (skill_id) {
    sql += ` WHERE skill_id = ?`;
    params.push(skill_id);
  }

  sql += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
  params.push(Number(limit), Number(offset));

  const [rows] = await connectDB.db.query(sql, params);
  return rows;
};

export const getQuestionById = async (id) => {
  const [rows] = await connectDB.db.query(
    "SELECT * FROM questions WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

export const getAllSkills = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const [rows] = await connectDB.db.query(
    `SELECT * FROM skill_categories ORDER BY id DESC LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );
  return rows;
};

export const getSkillById = async (id) => {
  const [rows] = await connectDB.db.query(
    `SELECT * FROM skill_categories WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const getAttemptById = async (id) => {
  const [rows] = await connectDB.db.query(
    `SELECT * FROM quiz_attempts WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const getUserAttempts = async (user_id) => {
  const [rows] = await connectDB.db.query(
    `SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY started_at DESC`,
    [user_id]
  );
  return rows;
};

export const getAllAttempts = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const [rows] = await connectDB.db.query(
    `SELECT a.*, u.name AS user_name, s.name AS skill_name
     FROM quiz_attempts a
     JOIN users u ON a.user_id = u.id
     JOIN skill_categories s ON a.skill_id = s.id
     ORDER BY a.started_at DESC LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );
  return rows;
};

export const getAllUsers = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const [rows] = await connectDB.db.query(
    "SELECT id, name, email, role FROM users ORDER BY id DESC LIMIT ? OFFSET ?",
    [Number(limit), Number(offset)]
  );
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await connectDB.db.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};
