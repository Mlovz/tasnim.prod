"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const hash_1 = __importDefault(require("./hash"));
class optService {
    generateOtp() {
        const otp = crypto_1.default.randomInt(1000, 9999);
        return otp;
    }
    sendBySms() { }
    verifyOtp(hashOtp, data) {
        let computedHash = hash_1.default.hashOtp(data);
        return computedHash === hashOtp;
    }
}
exports.default = new optService();
