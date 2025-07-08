import express from "express";
import { userList } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/list", userList);

export default router;
