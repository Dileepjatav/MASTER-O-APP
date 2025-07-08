import express from "express";
import {
  listSkills,
  getSkill,
  addSkill,
  editSkill,
  removeSkill,
} from "../controllers/skill.controller.js";

import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", listSkills);
router.get("/:id", getSkill);
router.post("/", authorizeRoles("admin"), addSkill);
router.put("/:id", authorizeRoles("admin"), editSkill);
router.delete("/:id", authorizeRoles("admin"), removeSkill);

export default router;
//
