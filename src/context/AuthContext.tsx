"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode"
import { authAPI } from "../services/api"

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

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token")
          setUser(null)
        } else {
          setUser({
            id: decoded.sub.id,
            email: decoded.sub.email,
            username: "",
            role: decoded.sub.role,
            isAdmin: decoded.sub.role === "admin",
          })
          checkAuth()
        }
      } catch (error) {
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
        localStorage.removeItem("token")
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { success, data } = await authAPI.login(email, password)

      if (!success) {
        return false
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      setUser(data.user)
      return true
    } catch (error) {
      return false
    }
  }

  const loginAdmin = async (email: string, password: string) => {
    try {
      const { success, data } = await authAPI.adminLogin(email, password)

      if (!success) {
        return false
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      setUser({ ...data.user, isAdmin: true })
      return true
    } catch (error) {
      return false
    }
  }

  const register = async (username: string, email: string, password: string, role = "customer") => {
    try {
      const { success, data } = await authAPI.register(username, email, password, role)

      if (!success) {
        return false
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      setUser(data.user)
      return true
    } catch (error) {
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