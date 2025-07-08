import {
  getAttemptById,
  getAllAttempts,
  getUserAttempts,
} from "../services/getDataFromDb.js";
import { createAttempt } from "../services/insertDataIntoDb.js";
import { deleteAttempt } from "../services/deleteDataFromDb.js";

export const addAttempt = async (req, res) => {
  try {
    const attemptId = await createAttempt({
      ...req.data,
      user_id: req.user.id,
    });
    res.status(201).json({ message: "Attempt created", id: attemptId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAttempt = async (req, res) => {
  try {
    const attempt = await getAttemptById(req.params.id);
    if (!attempt) return res.status(404).json({ message: "Not found" });
    res.json(attempt);
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

    res.json(data);
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
