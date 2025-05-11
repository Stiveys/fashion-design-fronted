"use client"

import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth()
  const location = useLocation()

  console.log("Protected Route Check:", {
    isAuthenticated,
    isAdmin,
    loading,
    path: location.pathname,
    user: user
      ? {
          id: user.id,
          email: user.email,
          role: user.role,
          isAdmin: user.isAdmin,
        }
      : null,
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
        <p className="ml-3">Loading authentication status...</p>
      </div>
    )
  }

  
  if (isAuthenticated && (isAdmin || user?.isAdmin || user?.role === "admin")) {
    console.log("Access granted to admin route")
    return <>{children}</>
  }

  console.log("Not authenticated or not admin, redirecting to login")
  return <Navigate to="/admin/login" replace state={{ from: location }} />
}

export default ProtectedRoute
