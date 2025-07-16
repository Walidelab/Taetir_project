import { error } from "console";
import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





export const createUser = async (userData) => {
    const { name , email , password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = ` INSERT INTO users (name, email, password)
                   VALUES ($1, $2, $3)
                   RETURNING id , name , email , created_at`;

    const values = [name, email, hashedPassword];

    const result = await db.query(query , values);
    return result.rows[0];
}

export const getUserByEmail = async (email)=> {
    const query = `SELECT * FROM users WHERE email = $1` ;
    const values = [email];

    const result = await db.query(query , values);
    return result.rows[0];
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


