import express from "express";

import userRoutes from "./users.routes.js";
import authRoutes from "./auth.routes.js";

import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use("/users", authenticateToken, authorizeRoles("user"), userRoutes);
router.use("/auth", authRoutes);

export default router;
