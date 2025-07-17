import {createUser , loginUser , getUserByEmail , getUserById , updatePassword} from "../services/userService.js";
import { sendOTPEmail } from "../services/nodemail.js";
import { StoreOTP , VerifyOTP } from "../services/RedisOTP.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { email, password , role } = req.body;

        if (!email || ! password || !role){
            return res.status(400).json({error : "All fields are required"});
        }

        const newUser = await createUser({ email, password , role });
        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

};

export const LoginUser = async (req, res) => {
    try {
        const { email , password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const result = await loginUser(email, password);

        res.cookie('token', result.token, {
            httpOnly: true,
            maxAge: 3600000 
        });

        return res.status(201).json({ message : "Login successful " , user : result.user , token: result.token });

    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
} 

export const ChangePassword  = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
            return res.status(400).json({ error: "Email and new password are required" });
        }
        await updatePassword(email, newPassword);
        return res.status(200).json({ message: "Password updated successfully" });
    }
    catch ( error){
        console.error("Error updating password:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const getProfile = async ( req , res ) => {
    try {
        const {email} = req.body ;

        if ( !email ) {
            return res.status(400).json({error : "Error Fetching User"})
        }

        const result = await getUserByEmail(email);

        return res.status(201).json({message: "Fetching user successfuly ", user: result});
    }
    catch (error){
        console.error("Error fetching usesr");
        return res.status(500).json({error : " Internal server error"});
    }
}

export const getProfileById = async (req , res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ message: "User fetched successfully", user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}

export const refreshToken = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        const newToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 3600000 
        });

        return res.status(200).json({ message: "Token refreshed successfully", token: newToken });
    });
}

function generateOTP() {

  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString(); 
}

export const sendOTP = async (req, res) => {

    try{
        const { email} = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        const otp = generateOTP();
        await sendOTPEmail(email, otp);
        const isStored = await StoreOTP(email, otp);
        if (!isStored) {
            return res.status(500).json({ error: "Failed to store OTP" });
        }
        return res.status(200).json({ message: "OTP sent successfully" });

        
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).json({ error: "Failed to send OTP email" });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ error: " OTP are required" });
        }

        const isVerified = await VerifyOTP(email, otp);
        if (!isVerified) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ error: "Failed to verify OTP" });
    }
}