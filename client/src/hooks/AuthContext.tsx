import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "@/utils/axios"; 

export interface User {
  id: string;
  email: string;
  username?: string | null; // Nullable in your database
  role?: 'mentor' | 'mentee' | null; // Nullable in your database
}

export interface Profile {
  id: string;
  user_id: string;
  first_name?: string | null;
  last_name?: string | null;
  bio?: string | null;
  interests?: string[] | null;
  avatar_url?: string | null;
  learning_objectives?: string | null;
  experience_level?: string | null;
}

// --- Context Definition ---

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  login: (userData: User, profileData: Profile | null) => void;
  logout: () => void;
  loading: boolean;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkUserSession = async () => {
    setLoading(true);
    try {

      const response = await api.get('/auth/current_user') ;

       const { user, profile } = response.data; 
 
      setUser(user);
      setProfile(profile);
    } catch (error) {
      
      console.log("No active session found.");
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  // On initial app load, check for an existing session.
  useEffect(() => {
    checkUserSession();
  }, []);

  // This function is called after a successful local login/signup to update the UI immediately.
  const login = (userData: User, profileData: Profile | null) => {
    setUser(userData);
    setProfile(profileData);
  };

  // This function logs the user out on both the server and the client.
  const logout = async () => {
    try {
      // Tell the server to destroy the session.
      await api.post('/logout');
    } catch (error) {
      console.error("Error during server logout:", error);
    } finally {
      // Always clear the state on the client side.
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, loading, refetchUser: checkUserSession }}>
      {children}
    </AuthContext.Provider>
  );
};


export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}