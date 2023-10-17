import express from "express";
import * as userController from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/", userController.getAll);
// userRoute.get("/", userController.getAll);
userRoute.post("/register", userController.register);
userRoute.post("/login", userController.login);

export default userRoute;
