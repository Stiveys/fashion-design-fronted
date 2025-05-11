"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useTheme } from "../context/ThemeContext"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      ...product,
      quantity: 1,
      selectedSize: product.sizes[0],
      selectedColor: product.colors[0],
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onQuickView) {
      onQuickView(product)
    }
  }

  return (
    <div
      className={`group relative hover-card ${
        isDark ? "bg-dark-secondary hover:shadow-xl hover:shadow-black/20" : "bg-white hover:shadow-lg"
      } rounded-lg overflow-hidden transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span
                className={`px-2 py-1 text-xs font-medium ${
                  isDark ? "bg-burgundy-600" : "bg-gray-700"
                } text-white rounded`}
              >
                New
              </span>
            )}
            {product.originalPrice && (
              <span
                className={`px-2 py-1 text-xs font-medium ${
                  isDark ? "bg-burgundy-600" : "bg-gray-700"
                } text-white rounded`}
              >
                Sale
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center gap-2 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleQuickView}
              className={`p-2 rounded-full ${
                isDark ? "bg-dark-elevated btn-glow" : "bg-white"
              } text-gray-700 hover:text-gray-900 transition-colors`}
              aria-label="Quick view"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-full ${
                isDark ? "bg-dark-elevated btn-glow" : "bg-white"
              } text-gray-700 hover:text-gray-900 transition-colors`}
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </button>
            <button
              onClick={handleWishlist}
              className={`p-2 rounded-full ${
                isDark ? "bg-dark-elevated btn-glow" : "bg-white"
              } text-gray-700 hover:text-gray-900 transition-colors`}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={18} className={inWishlist ? "fill-burgundy-600" : ""} />
            </button>
          </div>
        </div>

        <div className="p-4">
          <h3 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"} mb-1`}>{product.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              {product.originalPrice ? (
                <div className="flex items-center">
                  <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                    ${product.price.toFixed(2)}
                  </p>
                  <p className={`ml-2 text-sm line-through ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    ${product.originalPrice.toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>${product.price.toFixed(2)}</p>
              )}
            </div>
            <div className="flex items-center">
              {product.colors.length > 0 && (
                <div className="flex -space-x-1">
                  {product.colors.slice(0, 3).map((color) => (
                    <div
                      key={color}
                      className="w-3 h-3 rounded-full border border-white"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                  {product.colors.length > 3 && (
                    <div
                      className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] ${
                        isDark ? "bg-dark-elevated text-gray-300" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      +{product.colors.length - 3}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
