"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guarantorCtrl_1 = __importDefault(require("../controllers/guarantorCtrl"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// router.use(auth.protect);
router.route("/guarantor").post(auth_1.auth.protect, guarantorCtrl_1.default.createGuarantors);
exports.default = router;
