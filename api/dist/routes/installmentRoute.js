"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const installmentCtrl_1 = require("../controllers/installmentCtrl");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// router.use(auth.protect);
router
    .route("/installment")
    .get(auth_1.auth.protect, installmentCtrl_1.installmentCtrl.get)
    .post(auth_1.auth.protect, installmentCtrl_1.installmentCtrl.create);
router.route("/installment/:id").delete(auth_1.auth.protect, installmentCtrl_1.installmentCtrl.delete);
exports.default = router;
