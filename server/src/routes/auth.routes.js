import express from "express";

const router = express.Router();

import { registerUser , LoginUser , getProfile } from "../controllers/userController.js";


router.post("/register", registerUser);
router.post("/login" , LoginUser );
router.post("/me" ,getProfile );

export default router;
