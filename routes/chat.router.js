import { Router } from "express";
import Thread from "../models/thread.model.js";
import {
  getThreadById,
  getAllThread,
  deleteThreadById,
  chat,
} from "../controllers/thread.controller.js";

const chatRouter = Router();

chatRouter.get("/get_thread_by_id", getThreadById);
chatRouter.get("/get_all_thread", getAllThread);
chatRouter.delete("/delete_thread_by_id", deleteThreadById);
chatRouter.post("/chat", chat);

export default chatRouter;
