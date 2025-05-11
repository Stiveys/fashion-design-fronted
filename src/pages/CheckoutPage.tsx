"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../context/AuthContext"
import DeliveryTrackingMap from "../components/DeliveryTrackingMap"
import AuthModal from "../components/AuthModal"
import MpesaPaymentModal from "../components/MpesaPaymentModal"

type DeliveryStatus = "processing" | "shipped" | "out-for-delivery" | "delivered"

interface CheckoutPageProps {
  onNavigate?: (path: string) => void // For navigation without react-router-dom
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { state } = useCart()
  const { theme } = useTheme()
  const { isAuthenticated, user } = useAuth()
  const isDark = theme === "dark"
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("processing")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showMpesaModal, setShowMpesaModal] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true)
      return
    }

    if (selectedPaymentMethod === "mpesa") {
      setShowMpesaModal(true)
    } else {
      setShowPaymentModal(true)
    }
  }

  const completeOrder = () => {
    setShowPaymentModal(false)
    setShowMpesaModal(false)
    setPaymentComplete(true)
    setOrderPlaced(true)
    setDeliveryStatus("processing")

    // Simulate order status updates
    setTimeout(() => setDeliveryStatus("shipped"), 10000) // 10 seconds
    setTimeout(() => setDeliveryStatus("out-for-delivery"), 30000) // 30 seconds
    setTimeout(() => setDeliveryStatus("delivered"), 60000) // 1 minute
  }

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.id)
  }

  const handleAuthModalClose = () => {
    setShowAuthModal(false)
  }

  const handleMpesaPaymentComplete = () => {
    completeOrder()
  }

  // Calculate totals
  const subtotal = state.totalPrice
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className={`container mx-auto px-4 py-8 ${isDark ? "text-white" : ""}`}>
        <div className="text-center py-12">
          <p className="mb-6">Add some items to your cart before checking out.</p>
          <button
            onClick={() => onNavigate && onNavigate("/")}
            className={`px-6 py-3 ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-700 hover:bg-gray-600"} text-white rounded-md transition-colors`}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`container mx-auto px-4 py-8 ${isDark ? "text-white" : ""}`}>
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          {!orderPlaced ? (
            <>
              <div
                className={`${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-lg shadow-md p-6 mb-6`}
              >
                <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300 text-gray-900"} rounded-md focus:ring-gray-500 focus:border-gray-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300 text-gray-900"} rounded-md focus:ring-gray-500 focus:border-gray-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300 text-gray-900"} rounded-md focus:ring-gray-500 focus:border-gray-500`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300 text-gray-900"} rounded-md focus:ring-gray-500 focus:border-gray-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300 text-gray-900"} rounded-md focus:ring-gray-500 focus:border-gray-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white" : "border-gray-300 text-gray-900"} rounded-md focus:ring-gray-500 focus:border-gray-500`}
                    />
                  </div>
                </form>
              </div>

              <div
                className={`${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-lg shadow-md p-6 mb-6`}
              >
                <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="card"
                      name="payment"
                      type="radio"
                      className={`h-4 w-4 ${isDark ? "text-gray-600 border-gray-700" : "text-gray-600 border-gray-300"} focus:ring-gray-500`}
                      checked={selectedPaymentMethod === "card"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="card"
                      className={`ml-3 flex items-center text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/179/179457.png"
                        alt="Credit Card"
                        className="h-6 w-auto mr-2"
                      />
                      Credit Card
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="paypal"
                      name="payment"
                      type="radio"
                      className={`h-4 w-4 ${isDark ? "text-gray-600 border-gray-700" : "text-gray-600 border-gray-300"} focus:ring-gray-500`}
                      checked={selectedPaymentMethod === "paypal"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="paypal"
                      className={`ml-3 flex items-center text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                        alt="PayPal"
                        className="h-6 w-auto mr-2"
                      />
                      PayPal
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="mpesa"
                      name="payment"
                      type="radio"
                      className={`h-4 w-4 ${isDark ? "text-gray-600 border-gray-700" : "text-gray-600 border-gray-300"} focus:ring-gray-500`}
                      checked={selectedPaymentMethod === "mpesa"}
                      onChange={handlePaymentMethodChange}
                    />
                    <label
                      htmlFor="mpesa"
                      className={`ml-3 flex items-center text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png"
                        alt="M-PESA"
                        className="h-6 w-auto mr-2"
                      />
                      M-PESA
                    </label>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className={`${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-lg shadow-md p-6 mb-6`}
            >
              <div className="text-center py-4">
                <h2 className="text-xl font-medium mb-2">Thank you for your order!</h2>
                <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Your order has been placed and is being processed.
                </p>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Order #: <span className="font-medium">ELG-{Math.floor(Math.random() * 10000)}</span>
                </p>
              </div>

              {/* Delivery Tracking Map */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Track Your Delivery</h3>
                <DeliveryTrackingMap status={deliveryStatus} />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div
            className={`${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-lg shadow-md p-6 sticky top-6`}
          >
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>

            {!orderPlaced && (
              <div className="max-h-64 overflow-y-auto mb-4">
                <ul className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}>
                  {state.items.map((item) => (
                    <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-3 flex">
                      <div
                        className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border ${isDark ? "border-gray-700" : "border-gray-200"}`}
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-3 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium">
                            <h3>{item.name}</h3>
                            <p className="ml-1">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className={`mt-1 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {item.selectedSize && `Size: ${item.selectedSize}`}
                            {item.selectedColor && item.selectedSize && " | "}
                            {item.selectedColor && `Color: ${item.selectedColor}`}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-xs">
                          <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={`border-t pt-4 space-y-2 ${isDark ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex justify-between text-sm">
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Subtotal</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Shipping</p>
                <p className="font-medium">${shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>Tax</p>
                <p className="font-medium">${tax.toFixed(2)}</p>
              </div>
              <div
                className={`flex justify-between text-base font-medium mt-4 pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
              >
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
            </div>

            {!orderPlaced ? (
              <button
                onClick={handlePlaceOrder}
                className={`w-full mt-6 py-3 px-4 rounded-md transition-colors text-white ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Place Order
              </button>
            ) : (
              <button
                onClick={() => onNavigate && onNavigate("/")}
                className={`w-full mt-6 block text-center py-3 px-4 rounded-md transition-colors text-white ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Continue Shopping
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} initialMode="login" onNavigate={onNavigate} />

      {/* M-Pesa Payment Modal */}
      <MpesaPaymentModal
        isOpen={showMpesaModal}
        onClose={() => setShowMpesaModal(false)}
        amount={total}
        onPaymentComplete={handleMpesaPaymentComplete}
      />

      {/* Other Payment Modals */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-lg p-6 max-w-md w-full`}
          >
            {selectedPaymentMethod === "card" && (
              <div>
                <h3 className="text-xl font-medium mb-4">Enter Credit Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "border-gray-300"} rounded-md`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "border-gray-300"} rounded-md`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "border-gray-300"} rounded-md`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "border-gray-300"} rounded-md`}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === "paypal" && (
              <div>
                <h3 className="text-xl font-medium mb-4">PayPal Checkout</h3>
                <div className="text-center mb-4">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174861.png"
                    alt="PayPal"
                    className="h-16 mx-auto mb-4"
                  />
                  <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className={`w-full p-2 border ${isDark ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "border-gray-300"} rounded-md`}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowPaymentModal(false)}
                className={`px-4 py-2 border rounded-md ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={completeOrder}
                className={`px-4 py-2 text-white rounded-md ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutPage
