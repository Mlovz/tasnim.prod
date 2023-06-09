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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const guarantorModel_1 = __importDefault(require("../models/guarantorModel"));
const installmentModel_1 = __importDefault(require("../models/installmentModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const guarantorCtrl = {
    createGuarantors: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // const installment = await Installment.findById();
        const { installmentId, status } = req.body;
        console.log(installmentId, status);
        const post = yield installmentModel_1.default.findById(installmentId);
        if (!post)
            return next(new appError_1.default("This post does not exist.", 400));
        const newData = Object.assign(Object.assign({}, req.body), { user: req.user._id });
        const guarantor = yield guarantorModel_1.default.create(newData);
        yield installmentModel_1.default.findOneAndUpdate({ _id: installmentId }, {
            status: status,
            $push: { guarantors: guarantor._id },
        }, { new: true });
        res.json({
            msg: "Success",
            guarantor,
        });
    })),
};
exports.default = guarantorCtrl;
