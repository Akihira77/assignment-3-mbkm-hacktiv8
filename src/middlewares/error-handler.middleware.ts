import { NextFunction, Request, Response } from "express";
import UnauthenticatedError from "../errors/unauthenticated.error.js";
import BadRequestError from "../errors/bad-request.error.js";
import { StatusCodes } from "../utils/constant.js";
import NotFoundError from "../errors/not-found.error.js";

const errorHandlerMiddleware = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof UnauthenticatedError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else if (err instanceof BadRequestError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ msg: err.message });
    } else if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map(
            (err: Record<string, number | boolean>) => err.message
        );

        res.status(StatusCodes.BadRequest400).send({
            name: "Validation Error",
            errors,
        });
    } else {
        res.status(StatusCodes.InternalServerError500).send(err);
    }

    return;
};

export default errorHandlerMiddleware;
