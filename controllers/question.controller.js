import { z } from "zod";

import { getAllQuestions, getQuestionById } from "../services/getDataFromDb.js";
import { createQuestion } from "../services/insertDataIntoDb.js";
import { updateQuestion } from "../services/updateDataIntoDb.js";
import { deleteQuestion } from "../services/deleteDataFromDb.js";

import "dotenv/config";

export const getQuestions = async (req, res) => {
  try {
    const { skill_id, page = 1, limit = 10 } = req.query;
    const questions = await getAllQuestions({ skill_id, page, limit });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const question = await getQuestionById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const result = await createQuestion(req.body);
    res.status(201).json({ message: "Question created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editQuestion = async (req, res) => {
  try {
    await updateQuestion(req.params.id, req.body);
    res.json({ message: "Question updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeQuestion = async (req, res) => {
  try {
    await deleteQuestion(req.params.id);
    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
