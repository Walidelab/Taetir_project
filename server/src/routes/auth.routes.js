import express from "express";

const router = express.Router();

import { registerUser , LoginUser , ChangePassword , refreshToken , verifyOTP} from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";
import { sendOTP } from "../controllers/userController.js"



router.post("/register", registerUser);
router.post("/login" , LoginUser );
router.post("/refresh-token", protect, refreshToken);
router.post("/send-otp", sendOTP);
router.post("/change-password", protect, ChangePassword);
router.post("/verify-otp",  verifyOTP);

export default router;
