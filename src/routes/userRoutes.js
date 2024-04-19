import { Router } from "express";
import { getUser, loginUser, registerUser, updateUser } from "../controllers/userController";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.get("/getuser/:id", getUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", updateUser);

export default userRouter;
