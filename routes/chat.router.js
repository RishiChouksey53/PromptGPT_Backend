import { Router } from "express";
import Thread from "../models/thread.model.js";
import {
  getThreadById,
  getAllThread,
  deleteThreadById,
  chat,
} from "../controllers/thread.controller.js";
import { authMiddleware } from "../middleware/userAuthentication.js";

const chatRouter = Router();

chatRouter.get("/get_thread_by_id", getThreadById);
chatRouter.get("/get_all_thread", authMiddleware, getAllThread);
chatRouter.delete("/delete_thread_by_id", authMiddleware, deleteThreadById);
chatRouter.post("/chat", authMiddleware, chat);

export default chatRouter;
