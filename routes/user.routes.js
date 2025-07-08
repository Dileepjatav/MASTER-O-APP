import express from "express";
import {
  listUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
} from "../controllers/user.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authorizeRoles("admin"), listUsers);
router.get("/:id", getUser);
router.post("/", authorizeRoles("admin"), addUser);
router.put("/:id", editUser);
router.delete("/:id", authorizeRoles("admin"), removeUser);

export default router;
