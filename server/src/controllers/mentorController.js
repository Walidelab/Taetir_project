import { createMentor , getMentorById } from "../services/mentorService.js";
import { getProfileByUserId } from "../services/userService.js";

export const createMentorProfile = async (req, res) => {
    try {
        const mentorData = req.body;
        const newMentor = await createMentor(mentorData);
        return res.status(201).json({ message: "Mentor profile created successfully", mentor: newMentor });
    } catch (error) {
        console.error("Error creating mentor profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getMentorProfile = async (req, res) => {
    try {
        const mentorId = req.params.id;
        const mentor = await getMentorById(mentorId);
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }
        const profile = await getProfileByUserId(mentor.userId);
        return res.status(200).json({ profile, mentor });
    } catch (error) {
        console.error("Error fetching mentor profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
