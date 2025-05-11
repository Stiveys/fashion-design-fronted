"use client"

import type React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${
        isDark ? "bg-dark-elevated hover:bg-gray-700 text-gray-200" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
      } focus:outline-none animate-theme-switch`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} className="text-glow" /> : <Moon size={20} />}
    </button>
  )
}

export default ThemeToggle
