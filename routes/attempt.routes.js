import express from "express";
import {
  addAttempt,
  getAttempt,
  getAttempts,
  removeAttempt,
  summitAttempt,
} from "../controllers/attempt.controller.js";

import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", authorizeRoles("user", "admin"), addAttempt);
router.post("/submit", authorizeRoles("user", "admin"), summitAttempt);
router.get("/", authorizeRoles("user", "admin"), getAttempts);
router.get("/:id", authorizeRoles("user", "admin"), getAttempt);
router.delete("/:id", authorizeRoles("admin"), removeAttempt);

export default router;
