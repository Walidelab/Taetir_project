import express from "express";

import { getProfile , getProfileById } from "../controllers/userController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/me" ,getProfile );
router.get("/user/:id", getProfileById);


export default router;