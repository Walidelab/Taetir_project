import {createUser , loginUser , getUserByEmail } from "../services/userService.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || ! password){
            return res.status(400).json({error : "All fields are required"});
        }

        const newUser = await createUser({ name, email, password });
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