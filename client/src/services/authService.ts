import api from "../utils/axios"
import { AxiosError } from 'axios';


export async function loginUser(email: string, password: string) {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data; 
  } catch (error:any) {
    console.error(error)
  }
}


export async function chooseRole(userId: string , role: string) {
  const response = await api.post("/users/role", { userId, role })
  return response.data
}


export async function signupUser(username: string, email: string, password: string) {
  try {

    const response = await api.post('/auth/signup', { username, email, password });
 
    return response.data; 

  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || 'Signup failed';
    throw new Error(errorMessage);
  }
}


export async function forgotPassword(email: string) {
  const response = await api.post("/auth/send-otp", { email })
  return response.data
}

export async function verifyOtp(email: string, otp: string) {
  const response = await api.post("/auth/verify-otp", { email, otp })
  return response.data
}

export async function resetPassword(email: string, newPassword: string) {
  const response = await api.post("/auth/reset-password", { email, newPassword })
  return response.data
}

export async function updateProfile(profileData: any) {
  const response = await api.put("/profile", profileData)
  return response.data
}