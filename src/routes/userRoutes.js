import { Router } from "express";
import { login, saveUser } from "../controllers/userController";
const authRouter = Router();

authRouter.post("/register", saveUser);
authRouter.post("/login", login);

export default authRouter;
