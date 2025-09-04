import express from "express"
import { logOut, resetPassword, sendOtp, signIn, signUp, verifyOtp } from "../controllers/authControllers.js"
import { verify } from "jsonwebtoken"

const authRouter = express.Router()

authRouter.post("/signUp", signUp)
authRouter.post("/signIn", signIn)
authRouter.get("/logout", logOut)
authRouter.get("/send-otp", sendOtp)
authRouter.get("/verify-otp", verifyOtp)
authRouter.get("/reset-password", resetPassword)

export default authRouter;
