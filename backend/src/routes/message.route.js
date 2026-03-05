import express from "express";
import {
  getAllContacts,
  getMessageByUserId,
  sendMessage,
  getChatPartners,
} from "../controller/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection, protectedRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessageByUserId);

router.post("/send/:id", sendMessage);

export default router;
