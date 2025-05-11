"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { loginAdmin, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      console.log("Already authenticated as admin, redirecting to dashboard")
      navigate("/admin/dashboard", { replace: true })
    }
  }, [isAuthenticated, isAdmin, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Attempting admin login with:", email)
      const success = await loginAdmin(email, password)
      console.log("Admin login result:", success)

      if (success) {
        console.log("Login successful, redirecting to dashboard")
        // Navigate directly to dashboard after successful login
        navigate("/admin/dashboard", { replace: true })
      } else {
        setError("Invalid admin credentials. Please try again.")
      }
    } catch (err) {
      console.error("Admin login error:", err)
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>
            ELEGANCE
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">Admin Dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500"
                    : "border-gray-300 placeholder-gray-500 text-gray-900"
                } rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  isDark
                    ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500"
                    : "border-gray-300 placeholder-gray-500 text-gray-900"
                } rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-center text-red-500">
              <p>{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200 ease-in-out ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Back to Store
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
