import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader?.startsWith("Bearer ")
  //   ? authHeader.split(" ")[1]
  //   : null;

  // if (!token) return res.sendStatus(401);

  // jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);
  req.user = {
    id: "12345", // Replace with actual user ID from token
    role: "admin", // Replace with actual user role from token
  }; // Simulating a user object for demonstration purposes

  //   next();
  // });
  next();
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
};
