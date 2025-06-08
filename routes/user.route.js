import { Router } from "express";
import { registerUserController } from "../controllers/users.controller.js";

const userRoute = Router();

userRoute.post("/register" , registerUserController)

export default userRoute 