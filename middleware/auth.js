import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  console.log("Generated token:", token);
  return token;
};

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    // console.log("authHeader", authHeader);
    if (authHeader == null) throw new Error("token not provided");

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    // console.log("token", token);

    if (!token) throw new Error("token not provided");

    let JWT_SECRET = process.env.JWT_SECRET;

    if (JWT_SECRET == null || !(typeof JWT_SECRET == "string")) {
      throw new Error("JWT_SECRET is not defined or is not a string");
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] },
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ "Invalid token.": err, error: "tokenerror" });
        } else {
          console.log("Decoded token:", decoded);

          req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          };

          next();
        }
      }
    );
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        error: {
          name: "InvalidToken",
          message: "Token is invalid",
        },
      });
    } else {
      res.status(500).json({
        error: {
          name: "InternalServerError",
          message: "Internal Server Error",
        },
      });
    }
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
};
