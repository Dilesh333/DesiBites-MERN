import express from "express"
import { googleAuth, logOut, resetPassword, sendOtp, signIn, signUp, verifyOtp } from "../controllers/authControllers.js"


const authRouter = express.Router()

authRouter.post("/signUp", signUp)
authRouter.post("/signIn", signIn)
authRouter.get("/logout", logOut)
authRouter.post("/send-otp", sendOtp)
authRouter.post("/verify-otp", verifyOtp)
authRouter.post("/reset-password", resetPassword)
authRouter.post("/google-auth", googleAuth)

export default authRouter;
