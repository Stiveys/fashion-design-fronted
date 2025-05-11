"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import AdminLayout from "../../components/admin/AdminLayout"
import { useTheme } from "../../context/ThemeContext"

// Mock data - in a real app, this would come from your API
const mockCategories = ["Women", "Men", "Accessories"]

const mockProduct = {
  id: 1,
  name: "Elegant Silk Dress",
  description: "A beautiful silk dress perfect for special occasions.",
  category: "Women",
  price: 99.99,
  stock: 42,
  status: "Active",
  image:
    "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: ["Black", "Red", "Blue"],
  featured: true,
  trending: false,
}

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const isEditMode = id !== "new"
  const navigate = useNavigate()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    status: "Active",
    image: "",
    sizes: [] as string[],
    colors: [] as string[],
    featured: false,
    trending: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Simulate API call to fetch product data if in edit mode
    const fetchData = async () => {
      try {
        if (isEditMode) {
          // In a real app, you would fetch data from your API
          // const response = await fetch(`/api/admin/products/${id}`);
          // const data = await response.json();
          // setFormData(data);

          // Using mock data for demonstration
          setTimeout(() => {
            setFormData(mockProduct)
            setIsLoading(false)
          }, 1000)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, isEditMode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })
  }

  const handleArrayInputChange = (field: string, value: string) => {
    // Split by comma and trim whitespace
    const items = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "")

    setFormData({
      ...formData,
      [field]: items,
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required"
    }

    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.stock || isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number"
    }

    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)

    try {
      //  send data to our API
      // const response = await fetch(`/api/admin/products${isEditMode ? `/${id}` : ''}`, {
      //   method: isEditMode ? 'PUT' : 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // ku redirect 
      navigate("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
      setIsSaving(false)
    }
  }

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
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <p className="text-sm text-gray-500">{isEditMode ? "Update product information" : "Create a new product"}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={`overflow-hidden shadow-sm rounded-lg ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Product Name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  } ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  } ${errors.category ? "border-red-500" : ""}`}
                >
                  <option value="">Select a category</option>
                  {mockCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Price ($)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className={`text-gray-500 sm:text-sm`}>$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`block w-full pl-7 border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                      isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                    } ${errors.price ? "border-red-500" : ""}`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  } ${errors.stock ? "border-red-500" : ""}`}
                />
                {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
              </div>

              {/* Image URL */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  } ${errors.image ? "border-red-500" : ""}`}
                />
                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Product preview"
                      className="h-32 w-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              {/* Sizes */}
              <div>
                <label
                  htmlFor="sizes"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Sizes (comma separated)
                </label>
                <input
                  type="text"
                  name="sizes"
                  id="sizes"
                  value={formData.sizes.join(", ")}
                  onChange={(e) => handleArrayInputChange("sizes", e.target.value)}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  }`}
                  placeholder="XS, S, M, L, XL"
                />
              </div>

              {/* Colors */}
              <div>
                <label
                  htmlFor="colors"
                  className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                >
                  Colors (comma separated)
                </label>
                <input
                  type="text"
                  name="colors"
                  id="colors"
                  value={formData.colors.join(", ")}
                  onChange={(e) => handleArrayInputChange("colors", e.target.value)}
                  className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                    isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                  }`}
                  placeholder="Black, White, Red"
                />
              </div>

              {/* Featured & Trending */}
              <div className="sm:col-span-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="focus:ring-silver h-4 w-4 text-gray-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="featured" className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Featured Product
                    </label>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Display this product in the featured section
                    </p>
                  </div>
                </div>
                <div className="flex items-start mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="trending"
                      name="trending"
                      type="checkbox"
                      checked={formData.trending}
                      onChange={handleCheckboxChange}
                      className="focus:ring-silver h-4 w-4 text-gray-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="trending" className={`font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      Trending Product
                    </label>
                    <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      Display this product in the trending section
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`px-4 py-3 text-right sm:px-6 ${isDark ? "bg-dark-elevated" : "bg-gray-50"}`}>
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className={`inline-flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-silver mr-3 ${
                isDark
                  ? "border-gray-700 bg-dark-secondary text-gray-300 hover:bg-dark-elevated"
                  : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-800 hover:bg-gray-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
                isSaving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSaving ? "Saving..." : isEditMode ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}

export default ProductForm
