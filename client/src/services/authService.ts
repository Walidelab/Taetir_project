import api from "../utils/axios"
import { setToken  } from "../utils/auth"
import axios from "axios"


export async function loginUser(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password })
  setToken(response.data.token)
  return response.data
}

export async function chooseRole(userId: string , role: string) {
  const response = await api.post("/users/role", { userId, role })
  return response.data
}


export async function signup(email: string, password: string ) {
  const response = await api.post("/auth/register", { email, password })
  setToken(response.data.token)
  return response.data
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