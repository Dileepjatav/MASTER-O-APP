import {
  getAttemptById,
  getAllAttempts,
  getUserAttempts,
  getAllQuestions,
} from "../services/getDataFromDb.js";
import { createAttempt } from "../services/insertDataIntoDb.js";

import { deleteAttempt } from "../services/deleteDataFromDb.js";
import connectDB from "../config/db.js";

export const addAttempt = async (req, res) => {
  try {
    const { skill_id, page = 1, limit = 10 } = req.body;

    const attemptId = await createAttempt({
      skill_id,
      user_id: req.user.id,
    });

    const result = await getAllQuestions({ skill_id, page, limit });

    res
      .status(201)
      .json({ message: "Attempt created", attemptId, data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const getAttempt = async (req, res) => {
  try {
    const attempt = await getAttemptById(req.params.id);
    if (!attempt) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ data: attempt });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttempts = async (req, res) => {
  try {
    const data =
      req.user.role === "admin"
        ? await getAllAttempts(req.query)
        : await getUserAttempts(req.user.id);

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeAttempt = async (req, res) => {
  try {
    await deleteAttempt(req.params.id);
    res.json({ message: "Attempt deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const summitAttempt = async (req, res) => {
  try {
    const { score, responses, attempt_id } = req.body;
    console.log(req.body);

    for (const response of responses) {
      await connectDB.db.query(
        `INSERT INTO quiz_answers 
           (attempt_id, question_id, selected_option, is_correct) 
           VALUES (?, ?, ?, ?)`,
        [
          attempt_id,
          response.questionId,
          response.selected,
          response.selected === response.correct,
        ]
      );
    }

    const result2 = await connectDB.db.query(
      `UPDATE quiz_attempts
        SET total_score = ?, completed_at = NOW() WHERE id = ?`,
      [score, attempt_id]
    );

    res.status(201).json({
      success: true,
      data: {
        attempt_id,
        total_score: score,
        result2,
      },
    });
  } catch (err) {
    console.error("Error submitting attempt:", err);

    res.status(500).json({
      success: false,
      message: "Failed to submit attempt",
    });
  }
};
