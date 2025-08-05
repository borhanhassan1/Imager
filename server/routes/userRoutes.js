import express from "express";
import { register, login, credit } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/credit", userAuth, credit);
export default userRouter;
