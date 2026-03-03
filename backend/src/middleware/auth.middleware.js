import { ENV } from "../lib/env.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "Unautherize No token" });
    }
    const decode = jwt.verify(token, ENV.JWT_SECRET);
    if (!decode)
      return res.status(401).json({ message: "Unautherize Invalid token" });

    const user = await User.findById(decode.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // it like pass the req.user to the function next() to use
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server 500" });
  }
};
