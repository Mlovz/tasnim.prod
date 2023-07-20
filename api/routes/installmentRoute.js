import { Router } from "express";
import { installmentCtrl } from "../controllers/installmentCtrl/installmentCtrl";
import { auth } from "../middleware/auth";

const router = Router();

router
    .route("/installment")
    .get(auth.protect, installmentCtrl.get)
    .post(auth.protect, installmentCtrl.create);

router
    .route("/installment/debts")
    .get(auth.protect, installmentCtrl.getDebts)

router.route("/installment/:id").delete(auth.protect, installmentCtrl.delete);

export default router;
