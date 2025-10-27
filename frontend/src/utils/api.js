const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Non-JSON response received:', response.status, response.statusText);
      throw new Error('Backend server returned invalid response. Make sure the backend is running at http://localhost:5000');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Unable to connect to backend server. Please make sure the server is running at http://localhost:5000');
    }
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // Verify OTP
  verifyOTP: async (otpData) => {
    return apiCall('/users/verify-otp', {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
  },

  // Resend OTP
  resendOTP: async (phone, purpose) => {
    return apiCall('/users/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, purpose }),
    });
  },

  // Get current user
  getMe: async (token) => {
    return apiCall('/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default { authAPI };

