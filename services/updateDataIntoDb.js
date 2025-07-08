import connectDB from "../config/db.js";

export const updateQuestion = async (id, data) => {
  const {
    skill_id,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
  } = data;

  await connectDB.db.query(
    `UPDATE questions SET 
        skill_id = ?, 
        question_text = ?, 
        option_a = ?, 
        option_b = ?, 
        option_c = ?, 
        option_d = ?, 
        correct_option = ?
      WHERE id = ?`,
    [
      skill_id,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_option,
      id,
    ]
  );
};

export const updateSkill = async (id, { name, description }) => {
  await connectDB.db.query(
    `UPDATE skill_categories SET name = ?, description = ? WHERE id = ?`,
    [name, description || null, id]
  );
};

export const updateUser = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.name) {
    fields.push("name = ?");
    values.push(data.name);
  }
  if (data.email) {
    fields.push("email = ?");
    values.push(data.email);
  }
  if (data.password) {
    fields.push("password = ?");
    values.push(data.password);
  }
  if (data.role) {
    fields.push("role = ?");
    values.push(data.role);
  }

  values.push(id);
  const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
  await connectDB.db.query(sql, values);
};
