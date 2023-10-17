import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as photoController from "../controllers/photo.controller.js";

const photoRoute = express.Router();

photoRoute.get("/:id", authMiddleware, photoController.getPhotoById);
photoRoute.get("/", authMiddleware, photoController.getAllPhoto);
photoRoute.post("/", authMiddleware, photoController.createPhoto);

export default photoRoute;
