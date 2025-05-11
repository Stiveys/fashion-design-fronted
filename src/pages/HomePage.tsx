"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import ProductQuickView from "../components/ProductQuickView"
import ProductCarousel from "../components/ProductCarousel"
import NewsletterSignup from "../components/NewsletterSignup"
import type { Product } from "../types"
import { getFeaturedProducts, getTrendingProducts, getNewArrivals } from "../data/products"

const HomePage: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const featuredProducts = getFeaturedProducts()
  const trendingProducts = getTrendingProducts()
  const newArrivals = getNewArrivals()

  return (
    <div className={`min-h-screen ${isDark ? "bg-dark-primary text-gray-200" : "bg-white text-gray-800"}`}>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/5442447/pexels-photo-5442447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-3xl text-center">
            <div className="mb-6">
              <h1
                className={`text-6xl md:text-8xl lg:text-[75px] font-bold leading-tight mb-6 gradient-title transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              >
                Elevate your style with
                <br />
                <span className="elegance-text text-glow">ELEGANCE</span>
              </h1>
            </div>
            <p className="text-2xl md:text-3xl mb-10 text-white font-medium text-shadow-dark animate-pulse-slow">
              Discover our new collection that redefines modern{" "}
              <span className="text-silver font-semibold">ELEGANCE</span>.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/category/women"
                className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-md transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Shop Women
              </Link>
              <Link
                to="/category/men"
                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black rounded-md transition-colors font-medium shadow-lg"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-16 ${isDark ? "bg-dark-primary" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Women */}
            <div className="relative overflow-hidden group rounded-lg h-80">
              <img
                src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Women's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Women</h3>
                  <Link
                    to="/category/women"
                    className={`inline-block px-6 py-2 ${
                      isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-100"
                    } rounded-md transition-colors`}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Men */}
            <div className="relative overflow-hidden group rounded-lg h-80">
              <img
                src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Men's Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Men</h3>
                  <Link
                    to="/category/men"
                    className={`inline-block px-6 py-2 ${
                      isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-100"
                    } rounded-md transition-colors`}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Accessories */}
            <div className="relative overflow-hidden group rounded-lg h-80">
              <img
                src="https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Accessories Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Accessories</h3>
                  <Link
                    to="/category/accessories"
                    className={`inline-block px-6 py-2 ${
                      isDark ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-100"
                    } rounded-md transition-colors`}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`py-16 ${isDark ? "bg-dark-secondary" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Featured Products</h2>
            <Link
              to="/featured"
              className={`${
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
              } font-medium flex items-center`}
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <ProductCarousel products={featuredProducts} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* Promo Banner */}
      <section className={`py-16 ${isDark ? "bg-dark-primary" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-lg">
            <div className={`${isDark ? "bg-gray-800" : "bg-gradient-silver"} text-white py-16 px-8 md:px-16 md:w-1/2`}>
              <h2 className="text-3xl font-bold mb-4">Summer Collection 2025</h2>
              <p className="mb-8 text-gray-200">
                Discover our new summer essentials. Light fabrics, vibrant colors, and effortless style for the warmer
                days ahead.
              </p>
              <Link
                to="/collections/summer"
                className={`inline-block px-6 py-3 ${
                  isDark ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
                } rounded-md transition-colors font-medium`}
              >
                Explore Collection
              </Link>
            </div>
            <img
              src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Summer Collection"
              className="hidden md:block absolute top-0 right-0 w-1/2 h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className={`py-16 ${isDark ? "bg-dark-secondary" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Trending Now</h2>
            <Link
              to="/trending"
              className={`${
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
              } font-medium flex items-center`}
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <ProductCarousel products={trendingProducts} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* New Arrivals */}
      <section className={`py-16 ${isDark ? "bg-dark-primary" : "bg-white"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>New Arrivals</h2>
            <Link
              to="/new-arrivals"
              className={`${
                isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
              } font-medium flex items-center`}
            >
              View All
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          <ProductCarousel products={newArrivals} onQuickView={setQuickViewProduct} />
        </div>
      </section>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Quick View Modal */}
      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  )
}

export default HomePage
