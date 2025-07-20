import { error } from "console";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





export const createUser = async (userData) => {
    const { email , password , role} = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = ` INSERT INTO users (email, password, role)
                   VALUES ($1, $2, $3)
                   RETURNING id, email, created_at`;

    const values = [email, hashedPassword, role];

    const result = await db.query(query , values);
    return result.rows[0];
}

export const getUserByEmail = async (email)=> {
    const query = `SELECT * FROM users WHERE email = $1` ;
    const values = [email];

    const result = await db.query(query , values);
    return result.rows[0];
}

export const getUserById = async (id) => {
    const querty =`SELECT * FROM users WHERE id = $1`; 
    const values = [id];
    const result = await db.query(querty, values);
    return result.rows[0];
}

export const updatePassword = async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = `UPDATE users SET password = $1 WHERE email = $2`;
    const values = [hashedPassword, email];
    await db.query(query, values);
}

export const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export const loginUser = async ( email ,password) => {

    const user = await getUserByEmail(email);

    if ( !user) return new error('User not found ') ;

    bcrypt.compare(password , user.password , ( err , res) => {
        if (err){
            new error('Error comparing passwords');
        }
        if (!res) {
            throw new error('Invalid password');
        }
    }  )

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    const token = generateToken(user);
    return { user, token };
}


export const chooseRole = async (userId, role) => {
    const query = `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role`;
    const values = [role, userId];

    const result = await db.query(query, values);
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
}

export const CreateProfile = async (profileData) => {
    const { user_id , first_name, last_name, bio, avatar_url , skills , interests , learning_objectives , experience_level  } = profileData;

    const query = `INSERT INTO profiles (user_id, first_name, last_name, bio, avatar_url, skills, interests, learning_objectives, experience_level)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                   RETURNING id, user_id, first_name, last_name, bio, avatar_url, skills, interests, learning_objectives, experience_level`;
    const values = [user_id, first_name, last_name, bio, avatar_url, skills, interests, learning_objectives, experience_level];
    const result = await db.query(query, values);
    return result.rows[0];
}


export const getProfileByUserId = async (userId) => {
    const query = `SELECT * FROM profiles WHERE user_id = $1`;
    const values = [userId];
    const result = await db.query(query, values);
    return result.rows[0];
}

export const UpdateProfile = async (userId, profileData) => {
    const { first_name, last_name, bio, avatar_url, skills, interests, learning_objectives, experience_level } = profileData;

    const query = `UPDATE profiles SET first_name = $1, last_name = $2, bio = $3, avatar_url = $4, skills = $5, interests = $6, learning_objectives = $7, experience_level = $8
                   WHERE user_id = $9 RETURNING id, user_id, first_name, last_name, bio, avatar_url, skills, interests, learning_objectives, experience_level`;
    const values = [first_name, last_name, bio, avatar_url, skills, interests, learning_objectives, experience_level, userId];
    const result = await db.query(query, values);
    return result.rows[0];
}
