import { Router } from "express";
import {userCtrl} from "../controllers/userCtrl/userCtrl";
import {auth} from '../middleware/auth'

const router = Router();


router.patch("/update/profile", auth.protect, userCtrl.updateProfile);


export default router;
