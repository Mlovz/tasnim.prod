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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = __importDefault(require("../utils/appError"));
const generateToken_1 = require("../config/generateToken");
const config_1 = require("../config");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// const CLIENT_URL = `${process.env.BASE_URL}`;
const authCtrl = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { phone, password } = req.body;
            const user = yield userModel_1.default.findOne({ phone });
            if (user)
                return next(new appError_1.default("Пользователь с таким телефоном уже есть!", 400));
            const passwordHash = yield bcrypt_1.default.hash(password, 12);
            const newUser = Object.assign(Object.assign({}, req.body), { password: passwordHash });
            const active_token = (0, generateToken_1.generateActiveToken)({ newUser });
            const otp = yield config_1.otpService.generateOtp();
            const ttl = 1000 * 60 * 2;
            const expires = Date.now() + ttl;
            const data = `${otp}.${expires}`;
            const hash = config_1.hashService.hashOtp(data);
            res.json({
                hash: `${hash}.${expires}`,
                otp,
                active_token,
                phone,
            });
        }
        catch (err) { }
    }),
    otp: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token, otp, hash } = req.body;
            if (!token || !otp || !hash)
                return next(new appError_1.default("Ошибка", 400));
            const [hashedOtp, expires] = hash.split(".");
            if (Date.now() > +expires) {
                return next(new appError_1.default("Время подтверждения вышло", 400));
            }
            const data = `${otp}.${expires}`;
            const isValid = config_1.otpService.verifyOtp(hashedOtp, data);
            if (!isValid) {
                return res.status(400).json({ message: "Неправильный код!" });
            }
            const { newUser } = jsonwebtoken_1.default.verify(token, `${process.env.ACTIVE_TOKEN_SECRET}`);
            const user = yield userModel_1.default.findOne({ phone: newUser.phone });
            if (user)
                return next(new appError_1.default("Пользователь с таким телефоном уже есть!", 400));
            const newwUser = new userModel_1.default(newUser);
            yield newwUser.save();
            res.json({
                msg: "Аккаунт подтвержден! Пожалуйста войдите.",
                user: newwUser,
            });
        }
        catch (err) { }
    }),
    login: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { phone, password } = req.body;
        if (!phone || !password)
            return next(new appError_1.default("Пожалуйста введите телефон и пароль!", 400));
        const user = yield userModel_1.default.findOne({ phone });
        const isCorrect = yield bcrypt_1.default.compare(password, user.password);
        if (!user || !isCorrect)
            return next(new appError_1.default("Неправильный пароль или телефон! Пожалуйста проверьте данные.", 400));
        const access_token = (0, generateToken_1.generateAccessToken)({
            _id: user._id,
        });
        const refresh_token = (0, generateToken_1.generateRefreshToken)({
            _id: user._id,
        }, res);
        res.cookie("refreshtoken", refresh_token, {
            httpOnly: true,
            path: "/api/refresh_token",
            maxAge: 5 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
            // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        });
        res.status(200).json({
            status: "Success",
            user: Object.assign({}, user._doc),
            access_token,
        });
    })),
    refreshToken: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token)
            return res.status(400).json({ msg: "Please login now!" });
        const decoded = jsonwebtoken_1.default.verify(rf_token, `${generateToken_1.REFRESH_TOKEN_SECRET}`);
        if (!decoded.id)
            return next(new appError_1.default("Please login now!", 400));
        const user = yield userModel_1.default.findById(decoded.id).select("-password");
        if (!user)
            return next(new appError_1.default("This account does not exist.", 400));
        // if (rf_token !== user.rf_token)
        //   return next(new AppError("Please login now!", 400));
        const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
        const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id }, res);
        yield userModel_1.default.findOneAndUpdate({ _id: user._id }, {
            rf_token: refresh_token,
        });
        res.json({ access_token, user });
    })),
    logout: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        res.clearCookie("refreshtoken", { path: "/api/v1/refresh_token" });
        return res.json({ msg: "Logged out!" });
    })),
};
exports.default = authCtrl;
