import type React from "react"
import { Link } from "react-router-dom"
import { Instagram, Facebook, Twitter, Youtube, CreditCard, ShieldCheck, Truck } from "lucide-react"

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-300">
      {/* Services highlights */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center md:justify-start">
              <Truck className="mr-4 text-silver" size={32} />
              <div>
                <h3 className="font-semibold text-white">Free Shipping</h3>
                <p className="text-sm text-gray-400">On orders over $150</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <CreditCard className="mr-4 text-silver" size={32} />
              <div>
                <h3 className="font-semibold text-white">Secure Payment</h3>
                <p className="text-sm text-gray-400">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <ShieldCheck className="mr-4 text-silver" size={32} />
              <div>
                <h3 className="font-semibold text-white">30-Day Returns</h3>
                <p className="text-sm text-gray-400">Shop with confidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">ELEGANCE</h2>
            <p className="text-gray-400 mb-4">
              Premium fashion destination for the modern sophisticate. Curated collections that blend timeless elegance
              with contemporary style.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-silver transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-silver transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-silver transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-silver transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/women" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/category/men" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/category/accessories"
                  className="text-gray-400 hover:text-silver transition-all duration-300"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-silver transition-all duration-300">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-silver transition-all duration-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-silver transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-silver transition-all duration-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">&copy; {currentYear} ELEGANCE. All rights reserved.</p>
            <div className="flex space-x-4">
              <img
                src="https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Payment methods"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
