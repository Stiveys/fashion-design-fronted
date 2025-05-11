"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingBag, Heart, Menu, X, Search, User, LogOut } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { Link } from "react-router-dom"
import AuthModal from "./AuthModal"
import ThemeToggle from "../components/ThemeToggle"

const Navbar: React.FC = () => {
  const { state: cart, toggleCart } = useCart()
  const { state: wishlist } = useWishlist()
  const { isAuthenticated, user, logout } = useAuth()

  
  type UserWithProfile = typeof user & { profilePicture?: string }
  const userWithProfile = user as UserWithProfile

 
  const { theme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
      
    }
  }

  const isDark = theme === "dark"

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    setIsSearchOpen(false)
    setSearchQuery("")
  }


  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setShowUserMenu(false)
    }
  }


  const getTextColor = () => {
    if (isScrolled) {
      return isDark ? "text-gray-200 hover:text-white" : "text-gray-800 hover:text-gray-600"
    }
    return "text-white hover:text-gray-300"
  }

  const getBackgroundColor = () => {
    if (isScrolled) {
      return isDark ? "bg-gray-900" : "bg-white"
    }
    return "bg-transparent"
  }

  const getShadow = () => {
    if (isScrolled) {
      return isDark ? "shadow-lg shadow-black/20" : "shadow-md"
    }
    return ""
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getBackgroundColor()} ${getShadow()} ${
        isScrolled ? "py-2" : "py-4"
      }`}
      style={{
        background: isScrolled
          ? isDark
            ? "#121212"
            : "white"
          : "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-2 text-2xl font-bold tracking-tighter ${
              isScrolled && !isDark ? "text-gray-800" : "text-gray-300"
            }`}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white-200"
            >
              {/* Stylized fashion logo - scissors and thread */}
              <path
                d="M7 7.5C7 8.88071 8.11929 10 9.5 10C10.8807 10 12 8.88071 12 7.5C12 6.11929 10.8807 5 9.5 5C8.11929 5 7 6.11929 7 7.5Z"
                fill="currentColor"
              />
              <path
                d="M17 16.5C17 17.8807 18.1193 19 19.5 19C20.8807 19 22 17.8807 22 16.5C22 15.1193 20.8807 14 19.5 14C18.1193 14 17 15.1193 17 16.5Z"
                fill="currentColor"
              />
              <path d="M9.5 10L19.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9.5 5L19.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M2 5.5L7 7.5L2 9.5V5.5Z" fill="currentColor" />
              <path d="M2 14.5L7 16.5L2 18.5V14.5Z" fill="currentColor" />
            </svg>
            ELEGANCE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`font-medium transition-colors ${getTextColor()}`}>
              Home
            </Link>
            <Link to="/category/women" className={`font-medium transition-colors ${getTextColor()}`}>
              Women
            </Link>
            <Link to="/category/men" className={`font-medium transition-colors ${getTextColor()}`}>
              Men
            </Link>
            <Link to="/category/accessories" className={`font-medium transition-colors ${getTextColor()}`}>
              Accessories
            </Link>
            <Link to="/collections" className={`font-medium transition-colors ${getTextColor()}`}>
              Collections
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className={getTextColor()}>
              <ThemeToggle />
            </div>

            {/* Search */}
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={`transition-colors ${getTextColor()}`}>
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className={`relative transition-colors ${getTextColor()}`}>
              <Heart size={20} />
              {wishlist.totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2 ${
                    isDark ? "bg-gray-700" : "bg-gray-500"
                  } text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}
                >
                  {wishlist.totalItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button onClick={() => toggleCart()} className={`relative transition-colors ${getTextColor()}`}>
              <ShoppingBag size={20} />
              {cart.totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2 ${
                    isDark ? "bg-gray-700" : "bg-gray-500"
                  } text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}
                >
                  {cart.totalItems}
                </span>
              )}
            </button>

            {/* Account */}
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      aria-haspopup="true"
                      aria-expanded={showUserMenu}
                      aria-controls="user-menu"
                      className="hidden md:flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="User avatar"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : "profilePicture" in user && user.profilePicture ? (
                        <img
                          src={typeof userWithProfile.profilePicture === "string" ? userWithProfile.profilePicture : (userWithProfile.profilePicture instanceof Blob ? URL.createObjectURL(userWithProfile.profilePicture) : "")}
                          alt={`${userWithProfile.name} avatar`}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      ) : (
                        <User size={24} className="text-gray-300" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfileImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                        aria-label="Change profile picture"
                        title="Change profile picture"
                      />
                    </button>
                    {showUserMenu && (
                      <div
                        id="user-menu"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex={-1}
                        onKeyDown={handleKeyDown}
                        className="absolute right-0 mt-2 w-48 bg-[#202123] text-[#E5E5E5] rounded-sm shadow-lg py-1 z-10"
                        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
                      >
                        <Link
                          to="/track-shipping"
                          role="menuitem"
                          tabIndex={0}
                          className="flex items-center w-full px-4 py-2 text-sm font-normal hover:bg-[#2A2B2E] focus:bg-[#2A2B2E] focus:outline-none"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 mr-3"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 10h1l1 2h13l1-2h1M3 10v6a2 2 0 002 2h14a2 2 0 002-2v-6M16 16a2 2 0 11-4 0"
                            />
                          </svg>
                          Track Shipping
                        </Link>
                        <div className="border-t border-[#2F3033]" />
                        <button
                          role="menuitem"
                          tabIndex={0}
                          onClick={() => {
                            logout()
                            setShowUserMenu(false)
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm font-normal hover:bg-[#2A2B2E] focus:bg-[#2A2B2E] focus:outline-none"
                        >
                          <LogOut size={20} className="mr-3" />
                          Log Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className={`hidden md:block transition-colors ${getTextColor()}`}
                  >
                    <User size={20} />
                  </button>
                )}

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden ${getTextColor()}`}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div
            className={`absolute top-full left-0 right-0 ${
              isDark ? "bg-gray-800" : "bg-white"
            } shadow-md p-4 animate-slideDown`}
          >
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`flex-grow p-2 border ${
                  isDark
                    ? "border-gray-700 bg-gray-900 text-white focus:border-gray-500"
                    : "border-gray-300 focus:border-gray-500"
                } focus:outline-none`}
              />
              <button
                type="submit"
                className={`${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-500 hover:bg-gray-600"
                } text-white p-2 px-4 transition-colors`}
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-0 right-0 ${
              isDark ? "bg-gray-900" : "bg-white"
            } shadow-md animate-slideDown`}
          >
            <nav className="flex flex-col">
              <Link
                to="/"
                className={`p-4 ${
                  isDark
                    ? "text-gray-200 hover:bg-gray-800 border-gray-800"
                    : "text-gray-800 hover:bg-gray-100 border-gray-200"
                } transition-colors border-b`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/women"
                className={`p-4 ${
                  isDark
                    ? "text-gray-200 hover:bg-gray-800 border-gray-800"
                    : "text-gray-800 hover:bg-gray-100 border-gray-200"
                } transition-colors border-b`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link
                to="/category/men"
                className={`p-4 ${
                  isDark
                    ? "text-gray-200 hover:bg-gray-800 border-gray-800"
                    : "text-gray-800 hover:bg-gray-100 border-gray-200"
                } transition-colors border-b`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link
                to="/category/accessories"
                className={`p-4 ${
                  isDark
                    ? "text-gray-200 hover:bg-gray-800 border-gray-800"
                    : "text-gray-800 hover:bg-gray-100 border-gray-200"
                } transition-colors border-b`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/collections"
                className={`p-4 ${
                  isDark
                    ? "text-gray-200 hover:bg-gray-800 border-gray-800"
                    : "text-gray-800 hover:bg-gray-100 border-gray-200"
                } transition-colors border-b`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/account"
                className={`p-4 ${
                  isDark
                    ? "text-gray-200 hover:bg-gray-800 border-gray-800"
                    : "text-gray-800 hover:bg-gray-100 border-gray-200"
                } transition-colors border-b`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    </header>
  )
}

export default Navbar
