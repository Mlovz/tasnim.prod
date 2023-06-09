import { Router } from "express";
import guarantorCtrl from "../controllers/guarantorCtrl";
import { auth } from "../middleware/auth";

const router = Router();

// router.use(auth.protect);

router.route("/guarantor").post(auth.protect, guarantorCtrl.createGuarantors);

export default router;
