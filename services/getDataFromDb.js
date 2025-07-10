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
    WHERE u.role = 'user'
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

export const getTimeBasedReport = async (startDate, endDate) => {
  console.log(startDate, endDate);
  const [rows] = await dbConnect.db.query(
    `
    SELECT 
      DATE_FORMAT(started_at, '%Y-%m') AS month,
      DATE_FORMAT(started_at, '%u') AS week_number,
      COUNT(*) AS total_attempts,
      SUM(total_score) AS total_score,
      AVG(total_score) AS average_score
    FROM quiz_attempts
    WHERE started_at BETWEEN ? AND ?
    GROUP BY month, week_number
    ORDER BY month DESC, week_number DESC
  `,
    [startDate, endDate]
  );
  return rows.length > 0 ? rows : [];
};

export const getAllQuestions = async ({ skill_id, page, limit }) => {
  const offset = (page - 1) * limit;
  let sql = `
    SELECT questions.*, skill_categories.name AS skill_name
    FROM questions
    JOIN skill_categories ON skill_categories.id = questions.skill_id
  `;
  const params = [];

  if (skill_id) {
    sql += ` WHERE questions.skill_id = ?`;
    params.push(skill_id);
  }

  sql += ` ORDER BY questions.id DESC LIMIT ? OFFSET ?`;
  params.push(Number(limit), Number(offset));

  const [rows] = await dbConnect.db.query(sql, params);
  return rows;
};

export const getQuestionById = async (id) => {
  const [rows] = await dbConnect.db.query(
    "SELECT * FROM questions WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

export const getAllSkills = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const [rows] = await dbConnect.db.query(
    `SELECT * FROM skill_categories ORDER BY id DESC LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)]
  );
  return rows;
};

export const getSkillById = async (id) => {
  const [rows] = await dbConnect.db.query(
    `SELECT * FROM skill_categories WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const getAttemptById = async (id) => {
  const [rows] = await dbConnect.db.query(
    `SELECT * FROM quiz_attempts WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
};

export const getUserAttempts = async (user_id) => {
  const [rows] = await dbConnect.db.query(
    `SELECT quiz_attempts.*,skill_categories.name FROM quiz_attempts JOIN skill_categories ON skill_categories.id = quiz_attempts.skill_id WHERE user_id = ? ORDER BY started_at DESC`,
    [user_id]
  );
  return rows;
};

export const getAllAttempts = async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;
  const [rows] = await dbConnect.db.query(
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
  const [rows] = await dbConnect.db.query(
    "SELECT id, name, email, role FROM users WHERE role='user' ORDER BY id DESC LIMIT ? OFFSET ?",
    [Number(limit), Number(offset)]
  );
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await dbConnect.db.query(
    "SELECT id, name, email, role FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};
