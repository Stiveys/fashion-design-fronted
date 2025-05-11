"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { X } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "register" | "adminLogin"
  onNavigate?: (path: string) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = "login", onNavigate }) => {
  const [mode, setMode] = useState<"login" | "register" | "adminLogin">(initialMode)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { login, register, loginAdmin } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  if (!isOpen) return null

  const resetForm = (): void => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError("")

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (mode === "register") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address")
        return
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long")
        return
      }
    }

    setIsLoading(true)

    try {
      let success = false

      if (mode === "login") {
        success = await login(email, password)
        if (success) {
          onClose()
          if (onNavigate) onNavigate("/")
        } else {
          setError("Invalid credentials. Please try again.")
        }
      } else if (mode === "register") {
        success = await register(name, email, password)
        if (success) {
          onClose()
          if (onNavigate) onNavigate("/")
        } else {
          setError("Registration failed. The email may already be in use or there was a server error.")
        }
      } else if (mode === "adminLogin") {
        success = await loginAdmin(email, password)
        if (success) {
          onClose()
          if (onNavigate) onNavigate("/admin/dashboard")
        } else {
          setError("Invalid admin credentials. Please try again.")
        }
      }
    } catch (err) {
      console.error("Auth error:", err)
      setError(`An error occurred: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`)
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = (newMode: "login" | "register" | "adminLogin"): void => {
    setMode(newMode)
    resetForm()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-6 ${isDark ? "bg-gray-800" : "bg-white"}`}>
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button type="button" onClick={onClose} className="bg-transparent rounded-md text-gray-400 hover:text-gray-500 focus:outline-none">
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className={`text-lg leading-6 font-medium ${isDark ? "text-white" : "text-gray-900"} text-center mb-6`}>
                {mode === "login" ? "Sign in to your account" : mode === "register" ? "Create a new account" : "Admin Sign In"}
              </h3>

              {mode !== "adminLogin" && (
                <div className="flex justify-center mb-6">
                  <div className="flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => switchMode("login")}
                      className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                        mode === "login"
                          ? isDark ? "bg-gray-700 text-white" : "bg-gray-800 text-white"
                          : isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => switchMode("register")}
                      className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                        mode === "register"
                          ? isDark ? "bg-gray-700 text-white" : "bg-gray-800 text-white"
                          : isDark ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {mode === "register" && (
                  <div className="mb-4">
                    <label htmlFor="name" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={`block w-full px-3 py-2 border ${isDark ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500" : "border-gray-300 placeholder-gray-400 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="email" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`block w-full px-3 py-2 border ${isDark ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500" : "border-gray-300 placeholder-gray-400 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`block w-full px-3 py-2 border ${isDark ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500" : "border-gray-300 placeholder-gray-400 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                  />
                </div>

                {mode === "register" && (
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className={`block w-full px-3 py-2 border ${isDark ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500" : "border-gray-300 placeholder-gray-400 text-gray-900"} rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                    />
                  </div>
                )}

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                      isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
                    } text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading
                      ? mode === "login" || mode === "adminLogin"
                        ? "Signing in..."
                        : "Creating account..."
                      : mode === "login" || mode === "adminLogin"
                        ? "Sign In"
                        : "Create Account"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className={`mt-3 w-full inline-flex justify-center rounded-md border ${
                      isDark ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
                    } px-4 py-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm`}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {mode === "login" && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => switchMode("adminLogin")}
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Sign in as Admin
                  </button>
                </div>
              )}

              {mode === "adminLogin" && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => switchMode("login")}
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    Back to User Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
