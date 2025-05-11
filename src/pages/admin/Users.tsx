"use client"

import type React from "react"
import { useState, useEffect } from "react"
import AdminLayout from "../../components/admin/AdminLayout"
import { useTheme } from "../../context/ThemeContext"

// Mock data - in a real app, this would come from your API
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    orders: 12,
    lastLogin: "2025-05-01",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Customer",
    status: "Active",
    orders: 8,
    lastLogin: "2025-04-28",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Admin",
    status: "Active",
    orders: 0,
    lastLogin: "2025-05-01",
    joinDate: "2023-11-10",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Customer",
    status: "Inactive",
    orders: 3,
    lastLogin: "2025-03-15",
    joinDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Customer",
    status: "Active",
    orders: 5,
    lastLogin: "2025-04-30",
    joinDate: "2024-01-30",
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    role: "Customer",
    status: "Active",
    orders: 7,
    lastLogin: "2025-04-29",
    joinDate: "2023-12-12",
  },
  {
    id: 7,
    name: "David Miller",
    email: "david.miller@example.com",
    role: "Customer",
    status: "Blocked",
    orders: 2,
    lastLogin: "2025-02-10",
    joinDate: "2024-01-05",
  },
]

const Users: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [users, setUsers] = useState(mockUsers)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        //   fetch data from our API
        // const response = await fetch('/api/admin/users');
        // const data = await response.json();
        // setUsers(data);

        // mock data ya demonstration 
        setTimeout(() => {
          setUsers(mockUsers)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching users:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleUserClick = (user: any) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "All" || user.role === roleFilter
    const matchesStatus = statusFilter === "All" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const roles = ["All", ...Array.from(new Set(users.map((user) => user.role)))]
  const statuses = ["All", ...Array.from(new Set(users.map((user) => user.status)))]

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
        <h1 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Users</h1>
        <p className="text-sm text-gray-500">Manage user accounts</p>
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
                placeholder="Search by name or email"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm rounded-md ${
                  isDark ? "bg-dark-elevated border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
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
      </div>

      {/* Users Table */}
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
                  User
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Role
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
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Orders
                </th>
                <th
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  } uppercase tracking-wider`}
                >
                  Last Login
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className={`px-6 py-4 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-elevated"
                    onClick={() => handleUserClick(user)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                              user.role === "Admin" ? "bg-gray-700" : "bg-gray-500"
                            }`}
                          >
                            {user.name.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === "Admin"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : user.status === "Inactive"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {user.orders}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleUserClick(user)
                        }}
                        className={`text-${isDark ? "silver" : "gray-600"} hover:text-${isDark ? "white" : "gray-900"}`}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && selectedUser && (
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
              <div className={`px-4 pt-5 pb-4 sm:p-6 ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className={`text-lg leading-6 font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                      User Details
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={selectedUser.name}
                          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                            isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue={selectedUser.email}
                          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                            isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="role"
                          className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
                        >
                          Role
                        </label>
                        <select
                          id="role"
                          name="role"
                          defaultValue={selectedUser.role}
                          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                            isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="Customer">Customer</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
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
                          defaultValue={selectedUser.status}
                          className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-silver focus:border-silver sm:text-sm ${
                            isDark ? "bg-dark-elevated border-gray-700 text-white" : "border-gray-300 text-gray-900"
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </div>
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
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-700 text-base font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowUserModal(false)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-silver sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                    isDark
                      ? "border-gray-700 bg-dark-secondary text-gray-300 hover:bg-dark-elevated"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setShowUserModal(false)}
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

export default Users
