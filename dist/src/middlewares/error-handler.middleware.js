import UnauthenticatedError from "../errors/unauthenticated.error.js";
import BadRequestError from "../errors/bad-request.error.js";
import { StatusCodes } from "../utils/constant.js";
import NotFoundError from "../errors/not-found.error.js";
const errorHandlerMiddleware = async (err, req, res, next) => {
    if (err instanceof UnauthenticatedError) {
        res.status(err.statusCode).send({ msg: err.message });
    }
    else if (err instanceof BadRequestError) {
        res.status(err.statusCode).send({ msg: err.message });
    }
    else if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ msg: err.message });
    }
    else if (err.name === "SequelizeValidationError") {
        const errors = err.errors.map((err) => err.message);
        res.status(StatusCodes.BadRequest400).send({
            name: "Validation Error",
            errors,
        });
    }
    else {
        res.status(StatusCodes.InternalServerError500).send(err);
    }
    return;
};
export default errorHandlerMiddleware;
//# sourceMappingURL=error-handler.middleware.js.map