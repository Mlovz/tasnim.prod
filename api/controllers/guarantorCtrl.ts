import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Guarantor from "../models/guarantorModel";
import Installment from "../models/installmentModel";
import AppError from "../utils/appError";

const guarantorCtrl = {
  createGuarantors: catchAsync(
    async (req: Request | any, res: Response, next: NextFunction) => {
      // const installment = await Installment.findById();
      const { installmentId, status } = req.body;

      console.log(installmentId, status);

      const post = await Installment.findById(installmentId);

      if (!post) return next(new AppError("This post does not exist.", 400));

      const newData = {
        ...req.body,
        user: req.user._id,
      };

      const guarantor: any = await Guarantor.create(newData);

      await Installment.findOneAndUpdate(
        { _id: installmentId },
        {
          status: status,
          $push: { guarantors: guarantor._id },
        },
        { new: true }
      );

      res.json({
        msg: "Success",
        guarantor,
      });
    }
  ),
};

export default guarantorCtrl;
