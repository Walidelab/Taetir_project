import { CreateProfile , getProfileByUserId , UpdateProfile} from "../services/userService.js";



export const createUserProfile = async (req, res) => {
    try {
        const profileData = req.body ;
        const newProfile = await CreateProfile(profileData);
        return res.status(201).json({ message: "Profile created successfully", profile: newProfile });
    } catch (error) {
        console.error("Error creating user profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        const profile = await getProfileByUserId(userId);
        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }
        return res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id; 
        const updatedProfile = await UpdateProfile(userId, req.body);
        return res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}   
