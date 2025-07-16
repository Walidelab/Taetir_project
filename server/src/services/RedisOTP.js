import bcrypt from 'bcrypt';
import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export const StoreOTP = async (email, otp) => { 
    try {
        const hashedOtp = await bcrypt.hash(otp, 10);
        await client.set(email, hashedOtp, 'EX', 600); // Store OTP with 10 minutes expiration
        return true;
    } catch (error) {
        console.error("Error storing OTP:", error);
        return false;
    }
}

export const VerifyOTP = async (email, otp) => {
    try {
        const storedOtp = await client.get(email);
        if (!storedOtp) {
            return false; 
        }
        const isMatch = await bcrypt.compare(otp, storedOtp);
        if (isMatch) {
            await client.del(email); 
            return true;
        }
        return false; 
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return false;
    }
}