"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    first_name: {
        type: String,
        default: "",
    },
    last_name: {
        type: String,
        default: "",
    },
    middle_name: {
        type: String,
        default: "",
    },
    nick_name: {
        type: String,
        default: "",
    },
    gender: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        required: [true, "Пожалуйства добавьте телефон"],
        unique: true,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        default: "",
    },
    password: {
        type: String,
        trim: true,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        default: "user",
    },
    address: {
        type: String,
        default: "",
    },
    address_correspondence: {
        type: String,
        default: "",
    },
    bik: {
        type: String,
        default: "",
    },
    cart: {
        type: Array,
        default: [],
    },
    checking_score: {
        type: String,
        default: "",
    },
    compare: {
        type: Array,
        default: [],
    },
    correspondent_score: {
        type: String,
        default: "",
    },
    date_of_birth: {
        type: String,
        default: "",
    },
    favorites: {
        type: Array,
        default: [],
    },
    inn: {
        type: String,
        default: "",
    },
    kpp: {
        type: String,
        default: "",
    },
    legal_address: {
        type: String,
        default: "",
    },
    legal_name: {
        type: String,
        default: "",
    },
    ogrn: {
        type: String,
        default: "",
    },
    payees_bank: {
        type: String,
        default: "",
    },
    purchases: {
        type: Array,
        default: [],
    },
    reviews: {
        type: Array,
        default: [],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("user", userSchema);
