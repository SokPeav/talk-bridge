import express from "express";
import {
  signin,
  signout,
  signup,
  updateProfile,
} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/sign-out", signout);
router.put("/update-profle", protectedRoute, updateProfile);
router.get("/check", protectedRoute, (req, res) =>
  res.status(200).json(req.user),
);

export default router;
