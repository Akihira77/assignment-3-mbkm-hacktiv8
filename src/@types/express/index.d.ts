import { Request } from "express";

type UserType = {
    userId: string;
    email: string;
    username: string;
};

declare module "express" {
    interface Request extends Request {
        user?: UserType;
    }
}
