import crypto from "crypto";

class hashService {
  hashOtp(data: any) {
    return crypto
      .createHmac("sha256", `${process.env.HASH_SECRET}`)
      .update(data)
      .digest("hex");
  }
}

export default new hashService();
