import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import User from '../models/userModel'


export const userCtrl = {
    updateProfile: catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {

        const newUser = await User.findOneAndUpdate({_id: req.user._id}, req.body)

        return res.json({
            title: 'Профиль обновлен.',
            user: newUser
        })
    })
}