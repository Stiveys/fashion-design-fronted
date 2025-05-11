import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Cart from "./components/Cart"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import CategoryPage from "./pages/CategoryPage"
import WishlistPage from "./pages/WishlistPage"
import CheckoutPage from "./pages/CheckoutPage"
import SearchPage from "./pages/SearchPage"
import TrackShippingPage from "./pages/TrackShippingPage"
import UserLogin from "./pages/UserLogin"
import Register from "./pages/Register"
import AdminLogin from "./pages/admin/AdminLogin"
import Dashboard from "./pages/admin/Dashboard"
import Products from "./pages/admin/Products"
import ProductForm from "./pages/admin/ProductForm"
import Orders from "./pages/admin/Orders"
import Users from "./pages/admin/Users"
import ProtectedRoute from "./components/admin/ProtectedRoute"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import "./index.css"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<Register />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products/new"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/products/:id/edit"
                  element={
                    <ProtectedRoute>
                      <ProductForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all route for admin paths */}
                <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />

                {/* Store Routes */}
                <Route
                  path="/"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <HomePage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <ProductPage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
                <Route
                  path="/category/:category"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <CategoryPage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
                <Route
                  path="/wishlist"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <WishlistPage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <CheckoutPage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
                <Route
                  path="/track-shipping"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <TrackShippingPage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <div className="flex flex-col min-h-screen transition-theme duration-300 dark:bg-dark-primary dark:text-white">
                      <Navbar />
                      <main className="flex-grow">
                        <SearchPage />
                      </main>
                      <Footer />
                      <Cart />
                    </div>
                  }
                />
              </Routes>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
