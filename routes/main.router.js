import { Router } from "express";
import chatRouter from "./chat.router.js";

const mainRouter = Router();

mainRouter.use("/api", chatRouter);

export default mainRouter;
