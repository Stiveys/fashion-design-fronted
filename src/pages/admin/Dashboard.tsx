"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { useTheme } from "../../context/ThemeContext"
import { Link } from "react-router-dom"

// Mock data - Backend hizo  API
const mockStats = {
  totalProducts: 124,
  totalOrders: 1842,
  totalUsers: 573,
  totalRevenue: 128459.99,
  recentOrders: [
    { id: "ORD-9385", customer: "John Doe", date: "2025-05-01", total: 129.99, status: "Delivered" },
    { id: "ORD-9384", customer: "Jane Smith", date: "2025-05-01", total: 79.99, status: "Processing" },
    { id: "ORD-9383", customer: "Robert Johnson", date: "2025-04-30", total: 249.99, status: "Shipped" },
    { id: "ORD-9382", customer: "Emily Davis", date: "2025-04-30", total: 189.99, status: "Delivered" },
    { id: "ORD-9381", customer: "Michael Wilson", date: "2025-04-29", total: 99.99, status: "Processing" },
  ],
  topProducts: [
    { id: 1, name: "Elegant Silk Dress", sales: 42, revenue: 4199.58 },
    { id: 2, name: "Premium Leather Jacket", sales: 38, revenue: 7599.62 },
    { id: 3, name: "Designer Sunglasses", sales: 65, revenue: 3249.35 },
    { id: 4, name: "Luxury Watch", sales: 28, revenue: 8399.72 },
    { id: 5, name: "Cashmere Scarf", sales: 53, revenue: 2649.47 },
  ],
}

const Dashboard: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [stats, setStats] = useState(mockStats)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch data from your API
        // const response = await fetch('/api/admin/dashboard-stats');
        // const data = await response.json();
        // setStats(data);

        // mock data ya demonstration
        setTimeout(() => {
          setStats(mockStats)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="shopping-bag"
          change="+12%"
          isDark={isDark}
        />
        <StatCard title="Total Orders" value={stats.totalOrders} icon="shopping-cart" change="+8%" isDark={isDark} />
        <StatCard title="Total Users" value={stats.totalUsers} icon="users" change="+15%" isDark={isDark} />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon="currency-dollar"
          change="+10%"
          isDark={isDark}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className={`rounded-lg shadow-sm overflow-hidden ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Recent Orders</h3>
          </div>
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
                </tr>
              </thead>
              <tbody
                className={`divide-y divide-gray-200 dark:divide-gray-800 ${isDark ? "bg-dark-secondary" : "bg-white"}`}
              >
                {stats.recentOrders.map((order) => (
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
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {order.customer}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {order.date}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      ${order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/admin/orders"
              className={`text-sm font-medium ${
                isDark ? "text-silver hover:text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              View all orders →
            </Link>
          </div>
        </div>

        {/* Top Products */}
        <div className={`rounded-lg shadow-sm overflow-hidden ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-800">
            <h3 className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}>Top Selling Products</h3>
          </div>
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
                    Sales
                  </th>
                  <th
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    } uppercase tracking-wider`}
                  >
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y divide-gray-200 dark:divide-gray-800 ${isDark ? "bg-dark-secondary" : "bg-white"}`}
              >
                {stats.topProducts.map((product) => (
                  <tr key={product.id}>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        isDark ? "text-silver" : "text-gray-700"
                      }`}
                    >
                      <Link to={`/admin/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {product.sales}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      ${product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
            <Link
              to="/admin/products"
              className={`text-sm font-medium ${
                isDark ? "text-silver hover:text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              View all products →
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}


interface StatCardProps {
  title: string
  value: number | string
  icon: string
  change: string
  isDark: boolean
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, isDark }) => {
  return (
    <div className={`rounded-lg shadow-sm p-6 ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
          {icon === "shopping-bag" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isDark ? "text-silver" : "text-gray-700"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          )}
          {icon === "shopping-cart" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isDark ? "text-silver" : "text-gray-700"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          )}
          {icon === "users" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isDark ? "text-silver" : "text-gray-700"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
          {icon === "currency-dollar" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isDark ? "text-silver" : "text-gray-700"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className={`text-sm font-medium truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>{title}</dt>
            <dd>
              <div className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4">
        <div className={`text-sm ${change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
          {change} from last month
        </div>
      </div>
    </div>
  )
}

export default Dashboard
