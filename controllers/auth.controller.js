import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { findUserByEmail } from "../services/getDataFromDb.js";
import { insertUser } from "../services/insertDataIntoDb.js";
import { generateToken } from "../middleware/auth.js";
import "dotenv/config";

export const login = async (req, res) => {
  try {
    const { email, password } = z
      .object({
        email: z
          .string({
            invalid_type_error: "email must be string",
            message: "Invalid email",
            required_error: "email is required",
          })
          .email({ message: "Invalid email address" }),
        password: z.string({
          invalid_type_error: "password must be string",
          message: "Invalid password",
          required_error: "password is required",
        }),
      })
      .parse(req.body);

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        message: "Invalid email",
        error: [
          {
            name: "email",
            error: "Invalid email",
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
        error: [
          {
            name: "password",
            error: "Invalid password",
          },
        ],
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(500).json({
        error: {
          name: "ZodError",
          message: error.issues[0].message,
          errors: [
            { name: error.issues[0].path[0], error: error.issues[0].message },
          ],
        },
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        error: {
          name: "InternalServerError",
          message: error.message,
        },
      });
    } else {
      res.status(500).json({
        error: {
          name: "InternalServerError",
          message: "Something Went wrong",
        },
      });
    }
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = z
      .object({
        name: z.string({
          invalid_type_error: "name must be string",
          message: "Invalid name",
          required_error: "name is required",
        }),
        email: z
          .string({
            invalid_type_error: "email must be string",
            message: "Invalid email",
            required_error: "email is required",
          })
          .email({ message: "Invalid email address" }),
        password: z
          .string({
            invalid_type_error: "password must be string",
            message: "Invalid password",
            required_error: "password is required",
          })
          .min(8, { message: "Password must be at least 8 characters long" })
          .regex(/[A-Za-z]/, {
            message: "Password must contain at least one letter",
          })
          .regex(/[0-9]/, {
            message: "Password must contain at least one number",
          }),
        role: z.string().refine((val) => val === "user" || val === "admin", {
          message: "Role must be either 'user' or 'admin'",
        }),
      })
      .parse(req.body);

    const existing = await findUserByEmail(email);

    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await insertUser(name, email, hashedPassword, role);

    const user = await findUserByEmail(email);
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: {
          name: "ZodError",
          message: error.issues[0].message,
          errors: [
            { name: error.issues[0].path[0], error: error.issues[0].message },
          ],
        },
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        error: {
          name: "InternalServerError",
          message: error.message,
        },
      });
    } else {
      res.status(500).json({
        error: {
          name: "InternalServerError",
          message: "Something Went wrong",
        },
      });
    }
  }
};
