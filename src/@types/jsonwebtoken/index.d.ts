import jwt from "jsonwebtoken";

declare module "jsonwebtoken" {
    interface JwtPayload extends jwt.JwtPayload {
        userId: string;
        email: string;
        username: string;
    }
}
