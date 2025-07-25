import React, { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import { removeToken, setToken } from "../utils/auth" // keep setToken to hold accessToken in memory/localStorage (optional)
import api from "../utils/axios"

export interface User {
  id: string
  email: string
  role?: string
}

export interface Profile {
  id: string
  userId: string
  first_name: string
  last_name: string
  bio?: string
  interests: string[]
  avatar_url?: string
  learning_objectives?: string
  experience_level?: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  token: string | null
  login: (user: User, token: string) => void
logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [token, setAuthToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // On app load, try to refresh token
  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.post<{ token: string; user: User }>(
          "/auth/refresh",
          {},
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setAuthToken(data.token);
        setToken(data.token);
        setUser(data.user);

        // Fetch user profile
        await fetchProfile(data.token);
      } catch (err) {
        console.log("No valid session found:", err);
        logout();
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, [])

  async function fetchProfile(authToken?: string) {
    try {
      const { data } = await api.get<{ profile: Profile }>("/profile", {
        headers: { Authorization: `Bearer ${authToken || token}` },
      })
      setProfile(data.profile)
    } catch (err) {
      console.error("Failed to fetch profile:", err)
      setProfile(null)
    }
  }

  // Login: call backend and set token in memory
 async function login(user: User, token: string) {
    setAuthToken(token)
    setToken(token)
    setUser(user)
    await fetchProfile(token);
  }

  // Logout: clear state and remove cookies
  function logout() {
    setAuthToken(null)
    removeToken()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
