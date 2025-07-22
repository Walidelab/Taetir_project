// src/api/axios.js
import axios from "axios"
import { getToken, logout , setToken} from "./auth"  // utility for token mgmt

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Change to your backend URL
  headers: { "Content-Type": "application/json" },
})

// Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout() // Force logout if token is invalid
      window.location.href = "/signin"
    }
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Attempt refresh
        const { data } = await axios.post("/refresh")
        setToken(data.token)
        error.config.headers.Authorization = `Bearer ${data.token}`
        return api(error.config)
      } catch (err) {
        logout()
        window.location.href = "/auth"
      }
    }
    return Promise.reject(error)
  }
)

export default api


