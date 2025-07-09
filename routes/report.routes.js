import express from "express";
import {
  reportUserPerformance,
  reportSkillGap,
  reportTimeBased,
} from "../controllers/report.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/user-performance",
  authenticateToken,
  authorizeRoles("admin"),
  reportUserPerformance
);
router.get(
  "/skill-gap",
  authenticateToken,
  authorizeRoles("admin"),
  reportSkillGap
);
router.get(
  "/time-based",
  authenticateToken,
  authorizeRoles("admin"),
  reportTimeBased
);

export default router;
