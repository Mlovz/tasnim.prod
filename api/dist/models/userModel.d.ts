import mongoose from "mongoose";
import { IUser } from "../config/interfaces";
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & Omit<IUser & {
    _id: mongoose.Types.ObjectId;
}, never>, any>;
export default _default;
