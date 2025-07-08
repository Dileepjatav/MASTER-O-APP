import express from "express";
import {
  getQuestions,
  getQuestion,
  addQuestion,
  editQuestion,
  removeQuestion,
} from "../controllers/question.controller.js";

import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestion);
router.post("/", authorizeRoles("user"), addQuestion);
router.put("/:id", authorizeRoles("user"), editQuestion);
router.delete("/:id", authorizeRoles("user"), removeQuestion);

export default router;
