const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleWare = require("../middlewares/auth.middleware");

const authRouter = Router();

authRouter.post("/register", authController.registerUserController)
authRouter.post("/login", authController.loginUserController)
authRouter.post("/logout", authController.logoutUserController)
authRouter.get("/get-me", authMiddleWare.authUser, authController.getMeControler)


module.exports = authRouter