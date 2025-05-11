"use client"

import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Heart, ShoppingBag, Star, Truck, Package, RefreshCw } from "lucide-react"
import { useTheme } from "../context/ThemeContext"
import ProductCard from "../components/ProductCard"
import { getProductById, getRelatedProducts } from "../data/products"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import type { CartItem } from "../types"

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const numId = Number.parseInt(id || "0", 10)
  const product = getProductById(numId)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes.length ? product.sizes[0] : undefined,
  )
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors.length ? product.colors[0] : undefined,
  )
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  if (!product) {
    return (
      <div className={`container mx-auto px-4 py-32 text-center ${isDark ? "text-white" : ""}`}>
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Link
          to="/"
          className={`px-6 py-3 ${
            isDark ? "bg-burgundy-600 hover:bg-burgundy-700 btn-glow-burgundy" : "bg-gray-700 hover:bg-gray-600"
          } text-white rounded-md transition-colors`}
        >
          Back to Home
        </Link>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const relatedProducts = getRelatedProducts(product.id, product.category)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    }

    addToCart(cartItem)
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className={`min-h-screen py-32 ${isDark ? "bg-dark-primary text-white" : ""}`}>
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex text-sm">
            <li>
              <Link
                to="/"
                className={`${isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"}`}
              >
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link
                to={`/category/${product.category}`}
                className={`${
                  isDark ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-600"
                } capitalize`}
              >
                {product.category}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className={`${isDark ? "text-gray-200" : "text-gray-900"} font-medium`}>{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className={`${isDark ? "bg-dark-secondary" : "bg-gray-100"} rounded-lg overflow-hidden`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-2`}>{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} className={index < 4 ? "fill-yellow-400" : ""} />
                ))}
              </div>
              <span className={`ml-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>4.0 (24 reviews)</span>
            </div>

            <div className="mb-6">
              {product.originalPrice ? (
                <div className="flex items-center">
                  <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-700"}`}>
                    ${product.price.toFixed(2)}
                  </p>
                  <p className={`ml-2 ${isDark ? "text-gray-400" : "text-gray-500"} line-through`}>
                    ${product.originalPrice.toFixed(2)}
                  </p>
                  <p
                    className={`ml-2 text-white ${
                      isDark ? "bg-burgundy-600" : "bg-gray-500"
                    } text-xs px-2 py-1 rounded`}
                  >
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
                  </p>
                </div>
              ) : (
                <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>

            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-8`}>{product.description}</p>

            {/* Color selection */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>Color</h3>
                  <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{selectedColor}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1 border rounded-md text-sm ${
                        selectedColor === color
                          ? isDark
                            ? "border-gray-400 bg-dark-elevated text-white"
                            : "border-gray-600 bg-gray-50 text-gray-600"
                          : isDark
                            ? "border-gray-700 text-gray-300 hover:border-gray-500"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                      } transition-colors`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {product.sizes.length > 0 && product.sizes[0] !== "One Size" && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>Size</h3>
                  <button
                    className={`text-sm font-medium ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-500"
                    }`}
                  >
                    Size guide
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 border rounded-md min-w-[40px] text-sm ${
                        selectedSize === size
                          ? isDark
                            ? "border-gray-400 bg-dark-elevated text-white"
                            : "border-gray-600 bg-gray-50 text-gray-600"
                          : isDark
                            ? "border-gray-700 text-gray-300 hover:border-gray-500"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                      } transition-colors`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"} mb-2`}>Quantity</h3>
              <div
                className={`flex items-center border rounded-md w-32 ${isDark ? "border-gray-700" : "border-gray-300"}`}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className={`px-3 py-1 ${
                    isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                  }`}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className={`flex-1 text-center ${isDark ? "text-white" : "text-gray-900"}`}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className={`px-3 py-1 ${
                    isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-800"
                  }`}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark
                    ? "bg-burgundy-600 hover:bg-burgundy-700 focus:ring-burgundy-500 btn-glow-burgundy"
                    : "bg-gray-700 hover:bg-gray-600 focus:ring-gray-500"
                }`}
              >
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center px-6 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDark
                    ? "text-gray-300 bg-dark-elevated border-gray-700 hover:bg-dark-secondary focus:ring-gray-700 btn-glow"
                    : "text-gray-600 bg-white border-gray-300 hover:bg-gray-50 focus:ring-gray-500"
                }`}
              >
                <Heart
                  size={20}
                  className={`mr-2 ${inWishlist ? (isDark ? "fill-burgundy-600" : "fill-gray-600") : ""}`}
                />
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Shipping Info */}
            <div className={`border-t pt-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Truck
                    size={20}
                    className={`mr-2 ${isDark ? "text-gray-400" : "text-gray-600"} flex-shrink-0 mt-0.5`}
                  />
                  <div>
                    <h4 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                      Free Shipping
                    </h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>On orders over $150</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Package
                    size={20}
                    className={`mr-2 ${isDark ? "text-gray-400" : "text-gray-600"} flex-shrink-0 mt-0.5`}
                  />
                  <div>
                    <h4 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>In Stock</h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Ready to ship</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <RefreshCw
                    size={20}
                    className={`mr-2 ${isDark ? "text-gray-400" : "text-gray-600"} flex-shrink-0 mt-0.5`}
                  />
                  <div>
                    <h4 className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                      30-Day Returns
                    </h4>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Shop with confidence</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === "description"
                    ? isDark
                      ? "border-burgundy-600 text-burgundy-500"
                      : "border-gray-600 text-gray-600"
                    : isDark
                      ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === "details"
                    ? isDark
                      ? "border-burgundy-600 text-burgundy-500"
                      : "border-gray-600 text-gray-600"
                    : isDark
                      ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-1 text-sm font-medium border-b-2 ${
                  activeTab === "reviews"
                    ? isDark
                      ? "border-burgundy-600 text-burgundy-500"
                      : "border-gray-600 text-gray-600"
                    : isDark
                      ? "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Reviews (24)
              </button>
            </nav>
          </div>
          <div className="py-6">
            {activeTab === "description" && (
              <div>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>{product.description}</p>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mt-4`}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            )}
            {activeTab === "details" && (
              <div>
                <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"} mb-2`}>Product Details</h3>
                <ul className={`list-disc pl-5 ${isDark ? "text-gray-300" : "text-gray-600"} space-y-1`}>
                  <li>Premium quality materials</li>
                  <li>Ethically made in Portugal</li>
                  <li>100% cotton</li>
                  <li>Machine washable at 30°C</li>
                  <li>Model is 5'9" and wears size S</li>
                </ul>

                <h3 className={`font-medium ${isDark ? "text-gray-200" : "text-gray-900"} mt-6 mb-2`}>
                  Shipping & Returns
                </h3>
                <ul className={`list-disc pl-5 ${isDark ? "text-gray-300" : "text-gray-600"} space-y-1`}>
                  <li>Free shipping on orders over $150</li>
                  <li>Standard delivery: 3-5 business days</li>
                  <li>Express delivery: 1-2 business days</li>
                  <li>30-day return policy</li>
                  <li>See our full return policy for more details</li>
                </ul>
              </div>
            )}
            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={20} className={index < 4 ? "fill-yellow-400" : ""} />
                    ))}
                  </div>
                  <span className={`ml-2 ${isDark ? "text-gray-200" : "text-gray-900"}`}>4.0 out of 5 stars</span>
                </div>

                <div className="space-y-6">
                  {/* Sample review */}
                  <div className={`border-b pb-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                          <Star key={index} size={16} className={index < 5 ? "fill-yellow-400" : ""} />
                        ))}
                      </div>
                      <h4 className={`ml-2 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                        Great quality and fit
                      </h4>
                    </div>
                    <div className="flex items-center mb-2">
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Sarah J. - <span>Verified Buyer</span>
                      </p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} ml-4`}>March 15, 2025</p>
                    </div>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      I love this piece! The material feels luxurious and the fit is perfect. Definitely worth the
                      investment.
                    </p>
                  </div>

                  {/* Sample review */}
                  <div className={`border-b pb-6 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                          <Star key={index} size={16} className={index < 4 ? "fill-yellow-400" : ""} />
                        ))}
                      </div>
                      <h4 className={`ml-2 text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                        Great product, runs small
                      </h4>
                    </div>
                    <div className="flex items-center mb-2">
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        Michael T. - <span>Verified Buyer</span>
                      </p>
                      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"} ml-4`}>February 28, 2025</p>
                    </div>
                    <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      The quality is excellent but it runs a bit small. I'd recommend sizing up if you're between sizes.
                    </p>
                  </div>

                  <button
                    className={`${
                      isDark ? "text-burgundy-500 hover:text-burgundy-400" : "text-gray-600 hover:text-gray-800"
                    } font-medium`}
                  >
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className={`text-2xl font-bold mb-8 ${isDark ? "text-gray-200" : ""}`}>You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
