import express from "express";
import {
  signin,
  signout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();
router.get("/test", arcjetProtection, (req, res) => {
  return res.send("hello");
});

router.post("/sign-up", arcjetProtection, signup);
router.post("/sign-in", arcjetProtection, signin);
router.post("/sign-out", arcjetProtection, signout);
router.put("/update-profle", protectedRoute, updateProfile);
router.get("/check", protectedRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
