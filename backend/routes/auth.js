import express from "express"
import { logOut, signIn, signUp } from "../controllers/authControllers.js"

const authRouter = express.Router()

authRouter.post("/signUp", signUp)
authRouter.post("/signIn", signIn)
authRouter.get("/logout", logOut)

export default authRouter;
