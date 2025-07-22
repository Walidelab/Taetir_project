// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { getToken, setToken, removeToken } from "../utils/auth"
import api from "../utils/axios"


export interface User {
  id: string
  email: string
  name?: string
}


interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setAuthToken] = useState<string | null>(getToken())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchProfile() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const { data } = await api.get<{ user: User }>("/users/profile")
        setUser(data.user)
      } catch (err) {
        console.error("Failed to fetch profile:", err)
        logout()
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token])

  function login(authToken: string, userData: User) {
    setAuthToken(authToken)
    setToken(authToken)
    setUser(userData)
  }

  function logout() {
    setAuthToken(null)
    removeToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
