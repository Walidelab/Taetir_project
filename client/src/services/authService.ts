import api from "../utils/axios"
import { setToken  } from "../utils/auth"


export async function loginUser(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password })
  setToken(response.data.token)
  return response.data
}

export async function signup(email: string, password: string , role: string) {
  const response = await api.post("/auth/register", { email, password , role })
  setToken(response.data.token)
  return response.data
}
export async function forgotPassword(email: string) {
  const response = await api.post("/auth/forgot-password", { email })
  return response.data
}

export async function verifyOtp(email: string, otp: string) {
  const response = await api.post("/auth/verify-otp", { email, otp })
  return response.data
}

export async function resetPassword(token: string, newPassword: string) {
  const response = await api.post("/auth/reset-password", { token, newPassword })
  return response.data
}

export async function createProfile(profileData: any) {
  const response = await api.post("/profile/create", profileData)
  return response.data
}