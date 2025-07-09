import express from "express";

import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import questionRoutes from "./question.routes.js";
import skillRoutes from "./skills.routes.js";
import attemptRoutes from "./attempt.routes.js";
import reportRoutes from "./report.routes.js";

import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/reports", authenticateToken, reportRoutes);
router.use("/users", authenticateToken, userRoutes);
router.use("/questions", authenticateToken, questionRoutes);
router.use("/skills", authenticateToken, skillRoutes);
router.use("/attempts", authenticateToken, attemptRoutes);

export default router;
