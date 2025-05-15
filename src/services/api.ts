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
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { response, data };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout - please try again');
    }
    throw error;
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

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return { success: true, data }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      return { 
        success: false, 
        data: { message }
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { response, data } = await fetchFromAPI("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return { success: true, data }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      return { 
        success: false, 
        data: { message }
      }
    }
  },

  adminLogin: async (email: string, password: string) => {
    try {
      const { response, data } = await fetchFromAPI("/api/auth/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(data.message || 'Admin login failed');
      }

      return { success: true, data }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Admin login failed';
      return { 
        success: false, 
        data: { message }
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

      if (!response.ok) {
        throw new Error(data.message || 'Auth check failed');
      }

      return { success: true, data }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Auth check failed';
      return { 
        success: false, 
        data: { message }
      }
    }
  },
}