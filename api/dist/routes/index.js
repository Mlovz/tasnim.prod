"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const authRoute_1 = __importDefault(require("./authRoute"));
const installmentRoute_1 = __importDefault(require("./installmentRoute"));
const guarantorRoute_1 = __importDefault(require("./guarantorRoute"));
exports.routes = {
    authRoute: authRoute_1.default,
    installmentRoute: installmentRoute_1.default,
    guarantorRoute: guarantorRoute_1.default,
};
