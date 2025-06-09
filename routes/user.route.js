import { Router } from "express";
import { loginController, logoutController, registerUserController, verifyEmailController } from "../controllers/users.controller.js";
import auth from "../middlewire/auth.js";

const userRoute = Router();

userRoute.post("/register" , registerUserController)
userRoute.post("/verify-email",verifyEmailController)
userRoute.post("/login",loginController)
userRoute.get("/logout",auth,logoutController)

export default userRoute 