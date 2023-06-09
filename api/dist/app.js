"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
// import xss from 'xss-clean'
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = require("./routes");
const errCtrl_1 = require("./controllers/errCtrl");
const appError_1 = __importDefault(require("./utils/appError"));
const app = (0, express_1.default)();
app.enable("trust proxy");
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );
app.options("*", (0, cors_1.default)());
// Serving static files
// app.use(express.static(path.join(__dirname, 'public')));
// Set security HTTP headers
app.use((0, helmet_1.default)());
// Development logging
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, cors_1.default)({
    origin: "http://80.78.253.88",
    credentials: true,
}));
// Limit requests from same API
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(express_1.default.json());
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, hpp_1.default)({
    whitelist: [
        "duration",
        "ratingsQuantity",
        "ratingsAverage",
        "maxGroupSize",
        "difficulty",
        "price",
    ],
}));
app.use((0, compression_1.default)());
app.use("/api", routes_1.routes.authRoute);
app.use("/api", routes_1.routes.installmentRoute);
app.use("/api", routes_1.routes.guarantorRoute);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errCtrl_1.ErrorHandler);
exports.default = app;
