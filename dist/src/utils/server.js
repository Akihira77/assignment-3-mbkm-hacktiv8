import express from "express";
import "express-async-errors";
import morgan from "morgan";
import errorHandlerMiddleware from "../middlewares/error-handler.middleware.js";
import userRoute from "../routes/user.route.js";
import photoRoute from "../routes/photo.route.js";
function startServer() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan("dev"));
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/photo", photoRoute);
    app.use(errorHandlerMiddleware);
    return app;
}
export default startServer;
//# sourceMappingURL=server.js.map