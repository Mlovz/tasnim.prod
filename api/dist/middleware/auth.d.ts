/// <reference types="qs" />
import { Request, Response, NextFunction } from "express";
export declare const auth: {
    protect: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => void;
    restrictTo: (...roles: string[]) => (req: Request | any, res: Response, next: NextFunction) => void;
};
