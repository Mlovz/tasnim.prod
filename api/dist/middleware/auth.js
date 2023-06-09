"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.auth = {
    protect: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // 1) Getting token and check of it's there
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        if (!token) {
            return next(new appError_1.default("You are not logged in! Please log in to get access.", 401));
        }
        // 2) Verification token
        const decoded = yield jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        // 3) Check if user still exists
        const currentUser = yield userModel_1.default.findById(decoded.id);
        if (!currentUser) {
            return next(new appError_1.default("The user belonging to this token does no longer exist.", 401));
        }
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    })),
    restrictTo: (...roles) => {
        return (req, res, next) => {
            // roles ['admin', 'lead-guide']. role='user'
            if (!roles.includes(req.user.role)) {
                return next(new appError_1.default("You do not have permission to perform this action", 403));
            }
            next();
        };
    },
};
