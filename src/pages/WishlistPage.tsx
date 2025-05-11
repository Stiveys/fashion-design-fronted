"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Trash2 } from "lucide-react"
import { useWishlist } from "../context/WishlistContext"
import { useCart } from "../context/CartContext"
import type { CartItem } from "../types"
import ProductQuickView from "../components/ProductQuickView"

const WishlistPage: React.FC = () => {
  const { state: wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const handleAddToCart = (item: CartItem) => {
    addToCart({
      ...item,
      quantity: 1,
      selectedSize: item.sizes[0],
      selectedColor: item.colors[0],
    })
  }

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Heart size={24} className="text-gray-600 mr-2" />
          <h1 className="text-3xl font-bold">Your Wishlist</h1>
        </div>

        {wishlist.items.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">
              Save your favorite items to your wishlist so you can easily find them later.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wishlist.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <Link to={`/product/${item.id}`} className="text-gray-900 font-medium hover:text-gray-600">
                            {item.name}
                          </Link>
                          <p className="text-gray-500 mt-1">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.originalPrice ? (
                        <div>
                          <p className="text-gray-600 font-medium">${item.price.toFixed(2)}</p>
                          <p className="text-gray-500 line-through text-sm">${item.originalPrice.toFixed(2)}</p>
                        </div>
                      ) : (
                        <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                          aria-label="Add to cart"
                        >
                          <ShoppingBag size={18} />
                        </button>
                        <button
                          onClick={() => setQuickViewProduct(item)}
                          className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                          aria-label="Quick view"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
          <p className="text-gray-500">You haven't viewed any products yet.</p>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  )
}

export default WishlistPage
