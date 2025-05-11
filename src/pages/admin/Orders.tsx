"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { useTheme } from "../../context/ThemeContext"
import { Link } from "react-router-dom"

// Mock data - in a real app, this would come from your API
const mockOrders = [
  {
    id: "ORD-9385",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2025-05-01",
    total: 129.99,
    status: "Delivered",
    items: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-9384",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2025-05-01",
    total: 79.99,
    status: "Processing",
    items: 1,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-9383",
    customer: "Robert Johnson",
    email: "robert.johnson@example.com",
    date: "2025-04-30",
    total: 249.99,
    status: "Shipped",
    items: 4,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-9382",
    customer: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2025-04-30",
    total: 189.99,
    status: "Delivered",
    items: 2,
    paymentMethod: "M-PESA",
  },
  {
    id: "ORD-9381",
    customer: "Michael Wilson",
    email: "michael.wilson@example.com",
    date: "2025-04-29",
    total: 99.99,
    status: "Processing",
    items: 1,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-9380",
    customer: "Sarah Brown",
    email: "sarah.brown@example.com",
    date: "2025-04-29",
    total: 159.99,
    status: "Delivered",
    items: 2,
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-9379",
    customer: "David Miller",
    email: "david.miller@example.com",
    date: "2025-04-28",
    total: 219.99,
    status: "Cancelled",
    items: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-9378",
    customer: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    date: "2025-04-28",
    total: 89.99,
    status: "Delivered",
    items: 1,
    paymentMethod: "M-PESA",
  },
]

const Orders: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [orders, setOrders] = useState(mockOrders)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        //   fetch data from our API
        // const response = await fetch('/api/admin/orders');
        // const data = await response.json();
        // setOrders(data);

        //  mock data ya demonstration 
        setTimeout(() => {
          setOrders(mockOrders)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "All" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statuses = ["All", ...Array.from(new Set(orders.map((order) => order.status)))]

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
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Orders</h1>
        <p className="text-sm text-gray-500">Manage customer orders</p>
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
                placeholder="Search by order ID, customer name, or email"
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <label htmlFor="status" className="sr-only">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm rounded-md ${
                isDark ? "bg-dark-elevated border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
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
                  Order ID
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Date
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Total
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
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className={`px-6 py-4 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        isDark ? "text-silver" : "text-gray-700"
                      }`}
                    >
                      <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                          {order.customer}
                        </div>
                        <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{order.email}</div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {order.date}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : order.status === "Processing"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className={`text-${isDark ? "silver" : "gray-600"} hover:text-${isDark ? "white" : "gray-900"}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Orders
