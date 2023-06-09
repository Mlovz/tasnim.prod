/// <reference types="qs" />
import { NextFunction, Request, Response } from "express";
declare const authCtrl: {
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    otp: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
    login: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
    refreshToken: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
    logout: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
};
export default authCtrl;
