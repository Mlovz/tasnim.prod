import { Router } from "express";
import authCtrl from "../controllers/authCtrl";

const router = Router();

router.post("/register", authCtrl.register);
router.post("/active", authCtrl.otpRegister);
router.post("/login", authCtrl.login);
router.get("/refresh_token", authCtrl.refreshToken);
router.get("/logout", authCtrl.logout);
router.post("/forgot", authCtrl.forgotPassword);
router.post("/forgot/active", authCtrl.forgotPasswordActive);
router.post("/reset/password/:id", authCtrl.resetPassword);

// router.post("/v1/forgot", authCtrl.forgotPassword);
// router.post("/v1/reset_password/:userId/:token", authCtrl.resetPassword);

export default router;
