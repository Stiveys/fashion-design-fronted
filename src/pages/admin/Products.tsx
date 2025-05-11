"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { useTheme } from "../../context/ThemeContext"
import { Link } from "react-router-dom"

// Mock data - in a real app, this would come from your API
const mockProducts = [
  {
    id: 1,
    name: "Elegant Silk Dress",
    category: "Women",
    price: 99.99,
    stock: 42,
    status: "Active",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Premium Leather Jacket",
    category: "Men",
    price: 199.99,
    stock: 38,
    status: "Active",
    image:
      "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    category: "Accessories",
    price: 49.99,
    stock: 65,
    status: "Active",
    image:
      "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Luxury Watch",
    category: "Accessories",
    price: 299.99,
    stock: 28,
    status: "Active",
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    name: "Cashmere Scarf",
    category: "Accessories",
    price: 49.99,
    stock: 53,
    status: "Active",
    image:
      "https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    name: "Slim Fit Jeans",
    category: "Men",
    price: 79.99,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 7,
    name: "Summer Dress",
    category: "Women",
    price: 69.99,
    stock: 5,
    status: "Low Stock",
    image:
      "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 8,
    name: "Formal Shirt",
    category: "Men",
    price: 59.99,
    stock: 47,
    status: "Active",
    image:
      "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
]

const Products: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [products, setProducts] = useState(mockProducts)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, you would fetch data from your API
        // const response = await fetch('/api/admin/products');
        // const data = await response.json();
        // setProducts(data);

        // Using mock data for demonstration
        setTimeout(() => {
          setProducts(mockProducts)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching products:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDeleteClick = (productId: number) => {
    setProductToDelete(productId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (productToDelete !== null) {
      //   call our API to delete the product
      // await fetch(`/api/admin/products/${productToDelete}`, { method: 'DELETE' });

      // Update local state
      setProducts(products.filter((product) => product.id !== productToDelete))
      setShowDeleteModal(false)
      setProductToDelete(null)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))]

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Products</h1>
          <p className="text-sm text-gray-500">Manage your product inventory</p>
        </div>
        <Link
          to="/admin/products/new"
          className={`mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className={`mb-6 p-4 rounded-lg ${isDark ? "bg-dark-secondary" : "bg-white"} shadow-sm`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                name="search"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`focus:ring-silver focus:border-silver block w-full pl-10 sm:text-sm border-gray-300 rounded-md ${
                  isDark
                    ? "bg-dark-elevated border-gray-700 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                placeholder="Search products"
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm rounded-md ${
                isDark ? "bg-dark-elevated border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className={`overflow-hidden shadow-sm rounded-lg ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className={isDark ? "bg-dark-elevated" : "bg-gray-50"}>
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Product
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Category
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Price
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Status
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-right text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody
              className={`divide-y divide-gray-200 dark:divide-gray-800 ${isDark ? "bg-dark-secondary" : "bg-white"}`}
            >
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className={`px-6 py-4 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {product.name}
                          </div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {product.category}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      ${product.price.toFixed(2)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className={`text-${
                            isDark ? "silver" : "gray-600"
                          } hover:text-${isDark ? "white" : "gray-900"}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product.id)}
                          className={`text-${
                            isDark ? "silver" : "gray-600"
                          } hover:text-${isDark ? "white" : "gray-900"}`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div
              className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
                isDark ? "bg-dark-secondary" : "bg-white"
              }`}
            >
              <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${
                      isDark ? "bg-red-900" : "bg-red-100"
                    } sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className={`text-lg leading-6 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      Delete Product
                    </h3>
                    <div className="mt-2">
                      <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                        Are you sure you want to delete this product? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${
                  isDark ? "bg-dark-elevated" : "bg-gray-50"
                }`}
              >
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-silver sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                    isDark
                      ? "border-gray-700 bg-dark-secondary text-gray-300 hover:bg-dark-elevated"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

export default Products
