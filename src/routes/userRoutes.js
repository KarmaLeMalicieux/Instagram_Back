import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
