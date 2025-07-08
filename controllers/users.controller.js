import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { z } from "zod";

import { findUserByEmail, getAllUsers } from "../services/getDataFromDb.js";
import { insertUser } from "../services/insertDataIntoDb.js";

dotenv.config();

export const userList = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
