import { NextFunction, Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
  REFRESH_TOKEN_SECRET,
} from "../config/generateToken";
import { otpService, hashService } from "../config";
import catchAsync from "../utils/catchAsync";

// const CLIENT_URL = `${process.env.BASE_URL}`;

const authCtrl = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, password, first_name } = req.body;

      const user = await Users.findOne({ phone });

      if (user)
        return next(
            new AppError("Пользователь с таким телефоном уже есть!", 400)
        );

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { ...req.body, password: passwordHash };

      const active_token = generateActiveToken({ newUser });
      const otp = await otpService.generateOtp();
      const ttl = 1000 * 60;
      const expires = Date.now() + ttl;
      const data = `${otp}.${expires}`;

      const hash = hashService.hashOtp(data);

      res.json({
        hash: `${hash}.${expires}`,
        otp,
        active_token,
        phone,
        password,
        first_name
      });
    } catch (err) {}
  },

  otpRegister: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { token, otp, hash } = req.body;


    if (!token || !otp || !hash) return next(new AppError("Ошибка", 400));

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return next(new AppError("Время подтверждения вышло", 400));
    }

    const data = `${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Неправильный код!" });
    }

    const { newUser }: any = jwt.verify(
        token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
    );


    const user = await Users.findOne({ phone: newUser.phone });

    if (user)
      return next(
          new AppError("Пользователь с таким телефоном уже есть!", 400)
      );

    const activeUser = await Users.create(newUser)

    res.status(200).json({
      status: "Success",
      msg: "Аккаунт подтвержден! Пожалуйста войдите.",
      user: activeUser,
    });
  }),

  login: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { phone, password } = req.body;

    if (!phone || !password)
      return next(new AppError("Пожалуйста введите телефон и пароль!", 400));

    const user: any = await Users.findOne({ phone });
    if (!user)
      return next(
          new AppError(
              "Неправильный телефон! Пожалуйста проверьте данные.",
              400
          )
      );

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect)
      return next(
          new AppError(
              "Неправильный пароль! Пожалуйста проверьте данные.",
              400
          )
      );


    const access_token = generateAccessToken({
      _id: user._id,
    });
    const refresh_token = generateRefreshToken(
        {
          _id: user._id,
        },
        res
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5days
      sameSite: "none",
      secure: true,
      // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    res.status(200).json({
      status: "Success",
      user: {
        ...user._doc,
        password: ''
      },
      access_token,
    });
  }),

  refreshToken: catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        const rf_token = req.cookies.refreshtoken;

        if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

        const decoded = <any>jwt.verify(rf_token, `${REFRESH_TOKEN_SECRET}`);

        const newId = decoded.id || decoded._id;

        if (!newId) return next(new AppError("Please login now!", 400));

        const user: any = await Users.findById(newId).select("-password");
        if (!user) return next(new AppError("This account does not exist.", 400));

        // if (rf_token !== user.rf_token)
        //   return next(new AppError("Please login now!", 400));

        const access_token = generateAccessToken({ id: user._id });
        const refresh_token = generateRefreshToken({ id: user._id }, res);

        await Users.findOneAndUpdate(
            { _id: user._id },
            {
              rf_token: refresh_token,
            }
        );

        res.json({ access_token, user });
      }
  ),

  logout: catchAsync(
      async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie("refreshtoken", { path: "/api/v1/refresh_token" });
        return res.json({ msg: "Logged out!" });
      }
  ),

  forgotPassword: catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
    const {phone} = req.body

    const user = await Users.findOne({phone})

    if (!user) return next(new AppError("Пользователя с таким телефоном нет.", 400));

    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60;
    const expires = Date.now() + ttl;
    const data = `${otp}.${expires}`;

    const hash = hashService.hashOtp(data);

    res.json({
      hash: `${hash}.${expires}`,
      otp,
      phone,
    });

  }),
  forgotPasswordActive: catchAsync(async (req: Request, res: Response, next: NextFunction)=> {
    const { phone, otp, hash } = req.body;


    if (!phone || !otp || !hash) return next(new AppError("Ошибка", 400));

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return next(new AppError("Время подтверждения вышло", 400));
    }

    const data = `${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      return next(new AppError("Неправильный код!", 400));
    }

    const user:any = await Users.findOne({phone})

    if (!user) return next(new AppError("Пользователя с таким телефоном нет.", 400));


    res.status(200).json({
      status: "Success",
      phone,
      user: {
        ...user._doc,
        password: ''
      },
    });
  }),
  resetPassword: catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {password, currentPassword} = req.body
    const user = await Users.findOne({_id: req.params.id})
    if (!user) return next(new AppError("Пользователя с таким телефоном нет.", 400));

    const isCorrect = await bcrypt.compare(password, user.password);
    const isCorrectCurrentPassword = await bcrypt.compare(currentPassword, user.password);

    if(!isCorrectCurrentPassword){
      return next(new AppError("Вы указали неверный действующий пароль.", 400));
    }

    if(isCorrect){
      return next(new AppError("Пароль совпадает с действующим паролем.", 400));
    }

    const passwordHash = await bcrypt.hash(password, 8);
    user.password = passwordHash;
    await user.save();

    res.status(200).json({
      success: "Пароль изменен.",
    });

  })
};

export default authCtrl;
