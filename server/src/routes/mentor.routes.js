import { createMentorProfile , getMentorProfile } from "../controllers/mentorController.js";

import express from "express";

const router = express.Router();


router.post("/create", createMentorProfile);
router.get("/:id", getMentorProfile);

export default router;