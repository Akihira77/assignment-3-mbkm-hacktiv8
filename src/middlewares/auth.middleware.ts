import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../utils/constant.js";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.error.js";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthenticatedError("Invalid Credentials");
        }

        const token = authHeader.split(" ")[1];

        const payload = <jwt.JwtPayload>(
            jwt.verify(token!, process.env.JWT_SECRET!)
        );

        req.user = {
            userId: payload.userId,
            email: payload.email,
            username: payload.username,
        };

        next();
    } catch (error) {
        throw error;
    }
};

export default authMiddleware;
