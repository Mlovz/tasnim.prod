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
exports.installmentCtrl = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const installmentModel_1 = __importDefault(require("../models/installmentModel"));
var TarrifList;
(function (TarrifList) {
    TarrifList["ECONOM"] = "econom";
    TarrifList["EXPRESS"] = "express";
    TarrifList["STANDART"] = "standart";
})(TarrifList || (TarrifList = {}));
exports.installmentCtrl = {
    create: (0, catchAsync_1.default)((req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
        // const installment = await Installment.findById()
        const newData = Object.assign(Object.assign({}, req.body), { user: req.user._id });
        const data = yield installmentModel_1.default.create(newData);
        res.json({
            msg: "Success",
            data,
        });
    })),
    get: (0, catchAsync_1.default)((req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
        const newData = yield installmentModel_1.default.findOne({
            status: "not finished",
        });
        res.json({
            msg: "Success",
            newData,
        });
    })),
    delete: (0, catchAsync_1.default)((req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
        const post = yield installmentModel_1.default.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });
        res.json({
            msg: "Deleted!",
            newPost: Object.assign(Object.assign({}, post._doc), { user: req.user }),
        });
    })),
};
