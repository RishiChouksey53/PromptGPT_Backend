import { Router } from "express";
import chatRouter from "./chat.router.js";
import userRouter from "./user.router.js";

const mainRouter = Router();

mainRouter.use("/api", chatRouter);
mainRouter.use("/user", userRouter);

export default mainRouter;
