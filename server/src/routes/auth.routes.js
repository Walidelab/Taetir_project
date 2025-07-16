import express from "express";

const router = express.Router();

import { registerUser , LoginUser , getProfile , refreshToken} from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";
import { sendOTP } from "../controllers/userController.js"



router.post("/register", registerUser);
router.post("/login" , LoginUser );
router.post("/me" ,protect,getProfile );
router.post("/refresh-token", protect, refreshToken);
router.post("/send-otp", sendOTP);


export default router;
