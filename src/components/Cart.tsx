"use client"

import type React from "react"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

const Cart: React.FC = () => {
  const { state, removeFromCart, updateQuantity, toggleCart } = useCart()

  if (!state.isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => toggleCart(false)} />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 bottom-0 w-full md:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingBag size={20} className="mr-2" />
              Your Cart ({state.totalItems} items)
            </h2>
            <button
              onClick={() => toggleCart(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag size={64} className="mb-4 opacity-20" />
                <p className="text-lg mb-4">Your cart is empty</p>
                <button
                  onClick={() => toggleCart(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/product/${item.id}`} onClick={() => toggleCart(false)}>
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        {item.selectedColor && (
                          <p className="mt-1 text-sm text-gray-500">Color: {item.selectedColor}</p>
                        )}
                        {item.selectedSize && <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-gray-600 hover:text-gray-800"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-gray-800"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-gray-600 hover:text-gray-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p>${state.totalPrice.toFixed(2)}</p>
              </div>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  onClick={() => toggleCart(false)}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                <button
                  type="button"
                  className="font-medium text-gray-600 hover:text-gray-800"
                  onClick={() => toggleCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart
