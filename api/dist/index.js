"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const DB = process.env.DB;
mongoose_1.default
    .connect(`${DB}`)
    .then(() => console.log("DB connection successful!"))
    .catch((err) => {
    if (err)
        throw err;
});
const PORT = process.env.PORT || 8800;
const server = app_1.default.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
});
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
        console.log("💥 Process terminated!");
    });
});
