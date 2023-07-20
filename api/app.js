import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
// import xss from 'xss-clean'
import hpp from "hpp";
import bodyParser from "body-parser";
import compression from "compression";
import {routes} from "./routes";

// import { ErrorHandler } from "./controllers/errCtrl";
import AppError from "./utils/appError";

const app = express();
app.enable("trust proxy");

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.options("*", cors());

// Serving static files
// app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// app.use(
//   cors({
//     origin: "http://80.78.253.88",
//     credentials: true,
//   })
// );

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());

app.use(
    hpp({
        whitelist: [
            "duration",
            "ratingsQuantity",
            "ratingsAverage",
            "maxGroupSize",
            "difficulty",
            "price",
        ],
    })
);

app.use(compression());

app.use("/api", routes.authRoute);
app.use("/api", routes.installmentRoute);
app.use("/api", routes.userRoute);

// app.use("/api", routes.guarantorRoute);

app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(ErrorHandler);

export default app;
