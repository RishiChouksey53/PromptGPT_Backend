import { Router } from "express";
import {
  login,
  register,
  verify_token,
} from "../controllers/user.controller.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  loginValidation,
  registerValidation,
} from "../validations/userValidation.js";
import { authMiddleware } from "../middleware/userAuthentication.js";

const userRouter = Router();

userRouter.post("/register", validateRequest(registerValidation), register);
userRouter.post("/login", validateRequest(loginValidation), login);
userRouter.get("/verify_token", authMiddleware, verify_token);
export default userRouter;
