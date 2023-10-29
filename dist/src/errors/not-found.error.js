import { StatusCodes } from "../utils/constant.js";
class NotFoundError extends Error {
    statusCode;
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NotFound404;
    }
}
export default NotFoundError;
//# sourceMappingURL=not-found.error.js.map