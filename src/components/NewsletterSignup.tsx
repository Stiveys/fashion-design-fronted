"use client"

import type React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

   
    setTimeout(() => {
      setSubscribed(true)
      setError("")
    }, 500)
  }

  return (
    <section className="bg-black py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-80"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mail size={36} className="mx-auto mb-4 text-silver" />
            <h2 className="text-3xl font-bold mb-4 text-white">Join Our Newsletter</h2>
            <p className="text-silver mb-8">Stay updated with the latest trends, new arrivals, and exclusive offers.</p>

            {subscribed ? (
              <div className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded relative" role="alert">
                <p className="font-bold">Thank you for subscribing!</p>
                <p className="text-sm">You'll start receiving our newsletter shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full p-3 border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-silver focus:border-transparent"
                    required
                  />
                  {error && <p className="mt-1 text-red-400 text-sm text-left">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-silver text-black rounded-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-xs text-gray-400 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive marketing communications from us.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSignup
