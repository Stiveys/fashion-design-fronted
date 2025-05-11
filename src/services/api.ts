// Create a new file: src/utils/api.ts

// IMPORTANT: Hardcode the production URL
const API_BASE_URL = "https://fashion-design-backend-0jh8.onrender.com"

// Helper function for making API requests
export const fetchFromAPI = async (endpoint: string, options: RequestInit = {}) => {
  // Build the full URL
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  console.log(`Making API request to: ${url}`)

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    const data = await response.json()
    return { response, data }
  } catch (error) {
    console.error(`API request error for ${url}:`, error)
    throw error
  }
}

// Auth-specific API functions
export const authAPI = {
  register: async (username: string, email: string, password: string, role = "customer") => {
    console.log(`Registering user with API: ${API_BASE_URL}/api/auth/register`)
    const { response, data } = await fetchFromAPI("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password, role }),
    })
    return { success: response.ok, data }
  },

  login: async (email: string, password: string) => {
    console.log(`Logging in user with API: ${API_BASE_URL}/api/auth/login`)
    const { response, data } = await fetchFromAPI("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    return { success: response.ok, data }
  },

  adminLogin: async (email: string, password: string) => {
    console.log(`Admin login with API: ${API_BASE_URL}/api/auth/admin/login`)
    const { response, data } = await fetchFromAPI("/api/auth/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    return { success: response.ok, data }
  },

  checkAuth: async (token: string) => {
    console.log(`Checking auth with API: ${API_BASE_URL}/api/auth/check`)
    const { response, data } = await fetchFromAPI("/api/auth/check", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return { success: response.ok, data }
  },
}
