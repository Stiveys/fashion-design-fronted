"use client"

import type React from "react"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Menu, X, Moon, Sun } from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isDark = theme === "dark"

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/admin/products", label: "Products", icon: <ShoppingBag size={20} /> },
    { path: "/admin/orders", label: "Orders", icon: <ShoppingBag size={20} /> },
    { path: "/admin/users", label: "Users", icon: <Users size={20} /> },
    { path: "/admin/settings", label: "Settings", icon: <Settings size={20} /> },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"}`}>
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gray-800 text-white">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold">ELEGANCE Admin</h1>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${isDark ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"} shadow-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-gray-700">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold">ELEGANCE Admin</span>
            </Link>
          </div>

          <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? isDark
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-900"
                    : isDark
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md transition-colors ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Desktop Header */}
        <header
          className={`hidden lg:flex items-center justify-between p-4 ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } shadow-sm`}
        >
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 px-3 py-1 rounded-md ${
                isDark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 pt-20 lg:pt-4 min-h-screen">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
