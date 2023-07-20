import crypto from "crypto";
import hashService from "./hash";

class optService {
    generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }
    sendBySms() {}

    verifyOtp(hashOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashOtp;
    }
}

export default new optService();
