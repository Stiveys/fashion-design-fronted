"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode"
import { authAPI } from "../services/api" // Import the API utilities

interface User {
  id: number
  username: string
  email: string
  role: string
  isAdmin?: boolean
}

interface DecodedToken {
  sub: {
    id: number
    email: string
    role: string
  }
  exp: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  loginAdmin: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string, role?: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if token exists and is valid on initial load
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          setUser(null)
        } else {
          // Set user from token
          setUser({
            id: decoded.sub.id,
            email: decoded.sub.email,
            username: "", // This will be updated by checkAuth
            role: decoded.sub.role,
            isAdmin: decoded.sub.role === "admin",
          })
          checkAuth()
        }
      } catch (error) {
        console.error("Invalid token:", error)
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setUser(null)
        return
      }

      const { success, data } = await authAPI.checkAuth(token)

      if (success) {
        setUser(data.user)
      } else {
        // If token is invalid, remove it
        localStorage.removeItem("token")
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setUser(null)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      console.log("Logging in with:", email)

      const { success, data } = await authAPI.login(email, password)

      if (!success) {
        console.error("Login error response:", data)
        return false
      }

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      setUser(data.user)
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      const { success, data } = await authAPI.adminLogin(email, password)

      if (!success) {
        console.error("Admin login error response:", data)
        return false
      }

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      setUser({ ...data.user, isAdmin: true })
      return true
    } catch (error) {
      console.error("Admin login error:", error)
      return false
    }
  }

  const register = async (username: string, email: string, password: string, role = "customer") => {
    try {
      console.log("Registering user:", { username, email, role })

      const { success, data } = await authAPI.register(username, email, password, role)

      console.log("Registration response:", data)

      if (!success) {
        console.error("Registration error response:", data)
        return false
      }

      // Save token to localStorage
      if (data.token) {
        localStorage.setItem("token", data.token)
        console.log("Token saved to localStorage")
      } else {
        console.warn("No token received from server")
      }

      setUser(data.user)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const isAuthenticated = !!user
  const isAdmin = user?.isAdmin === true || user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        loginAdmin,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
