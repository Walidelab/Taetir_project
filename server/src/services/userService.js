import { error } from "console";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





export const createUser = async (userData) => {
    const { email , password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = ` INSERT INTO users (email, password)
                   VALUES ($1, $2)
                   RETURNING id, email, created_at`;

    const values = [email, hashedPassword];

    const user = await db.query(query , values);

    return { user: user.rows[0] };
}

export const createUserWithGoogle = async (userData) => {
    const { id, email } = userData;

    const query = `INSERT INTO users (id, email)
                   VALUES ($1, $2)
                   ON CONFLICT (id) DO NOTHING
                   RETURNING id, email`;
    const { name, picture } = userData;
    const query2 = `INSERT INTO profiles (user_id, name, picture)
                   VALUES ($1, $2, $3)`;
    

    await db.query(query2, [id, name, picture]);

    const result = await db.query(query, [id, email]);

    if (result.rows.length === 0) {
        throw new Error('User already exists');
    }

    return { user: result.rows[0] };
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





export const chooseRole = async (userId, role) => {
    const query = `UPDATE users SET role = $1 WHERE id = $2 RETURNING id, email, role`;
    const values = [role, userId];

    const result = await db.query(query, values);
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
}

export const CreateProfile = async (userId) => {

    const query = `INSERT INTO profiles (user_id)
                   VALUES ($1)
                   RETURNING id, user_id`;

    const values = [userId];
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
    const { first_name, last_name, role , bio, avatar_url, skills, interests, learning_objectives, experience_level } = profileData;

    const query = `UPDATE profiles SET first_name = $1, last_name = $2, role = $3, bio = $4, avatar_url = $5, skills = $6, interests = $7, learning_objectives = $8, experience_level = $9
                   WHERE user_id = $10 RETURNING id, user_id, first_name, last_name, role, bio, avatar_url, skills, interests, learning_objectives, experience_level`;
    const values = [first_name, last_name, role, bio, avatar_url, skills, interests, learning_objectives, experience_level, userId];
    const result = await db.query(query, values);
    return result.rows[0];
}
