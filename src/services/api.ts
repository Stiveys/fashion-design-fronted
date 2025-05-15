// Create a new file: src/utils/api.ts

// IMPORTANT: Hardcode the production URL
const API_BASE_URL = "https://fashion-design-backend-0jh8.onrender.com"

// Helper function for making API requests with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

// Helper function for making API requests
export const fetchFromAPI = async (endpoint: string, options: RequestInit = {}) => {
  // Build the full URL
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json()
    return { response, data }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    console.error(`API request error for ${url}:`, error)
    throw error
  }
}

// Auth-specific API functions
export const authAPI = {
  register: async (username: string, email: string, password: string, role = "customer") => {
    try {
      const { response, data } = await fetchFromAPI("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, role }),
      })
      return { success: response.ok, data }
    } catch (error) {
      return { 
        success: false, 
        data: { message: error instanceof Error ? error.message : 'Registration failed' }
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { response, data } = await fetchFromAPI("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      return { success: response.ok, data }
    } catch (error) {
      return { 
        success: false, 
        data: { message: error instanceof Error ? error.message : 'Login failed' }
      }
    }
  },

  adminLogin: async (email: string, password: string) => {
    try {
      const { response, data } = await fetchFromAPI("/api/auth/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })
      return { success: response.ok, data }
    } catch (error) {
      return { 
        success: false, 
        data: { message: error instanceof Error ? error.message : 'Admin login failed' }
      }
    }
  },

  checkAuth: async (token: string) => {
    try {
      const { response, data } = await fetchFromAPI("/api/auth/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return { success: response.ok, data }
    } catch (error) {
      return { 
        success: false, 
        data: { message: error instanceof Error ? error.message : 'Auth check failed' }
      }
    }
  },
}