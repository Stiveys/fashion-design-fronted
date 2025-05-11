"use client"

import type React from "react"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext"

interface MpesaPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  onPaymentComplete: () => void
}

const MpesaPaymentModal: React.FC<MpesaPaymentModalProps> = ({ isOpen, onClose, amount, onPaymentComplete }) => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // If you have useAuth, uncomment this line
  // const { user } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Format phone number if needed
      let formattedPhone = phoneNumber
      if (phoneNumber.startsWith("0")) {
        formattedPhone = "254" + phoneNumber.substring(1)
      } else if (!phoneNumber.startsWith("254")) {
        formattedPhone = "254" + phoneNumber
      }

      console.log("Sending M-PESA payment request:", {
        phone: formattedPhone,
        amount,
        // Include user_id if available
        user_id: 1, // Replace with user?.id if you have useAuth
      })

      // FIXED: Correct endpoint URL with the proper path
      const response = await fetch("https://fashion-design-backend-0jh8.onrender.com/mpesa/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          phone: formattedPhone,
          amount: amount.toFixed(2), 
          user_id: 1, 
        }),
      })

      console.log("M-PESA response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Server returned ${response.status}: ${JSON.stringify(errorData)}`)
      }

      const data = await response.json()
      console.log("M-PESA payment response:", data)

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          onPaymentComplete()
        }, 3000)
      } else {
        throw new Error(data.message || "Payment failed")
      }
    } catch (err) {
      console.error("Payment error:", err)
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDark ? "bg-gray-800 border border-gray-700" : "bg-white"} rounded-lg p-6 max-w-md w-full`}>
        <h3 className="text-xl font-medium mb-4">M-PESA Payment</h3>

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
                Enter your M-PESA registered phone number to receive a payment prompt.
              </p>
              <label className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"} mb-1`}>
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 0712345678 or 254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full p-2 border ${
                  isDark ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500" : "border-gray-300"
                } rounded-md`}
                required
              />
              <p className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                Amount: KES {amount.toFixed(2)}
              </p>
            </div>

            {error && <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">{error}</div>}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 border rounded-md ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-md ${
                  isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-green-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mb-4`}>
              Payment request sent! Check your phone for the M-PESA prompt.
            </p>
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm mb-4`}>
              Once you complete the payment on your phone, your order will be processed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MpesaPaymentModal