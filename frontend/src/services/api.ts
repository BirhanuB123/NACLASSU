import axios from 'axios';

// Use relative URL which will be proxied by Vite
// Vite proxy: /api -> http://localhost:5000/api
// So /api/auth/register becomes http://localhost:5000/api/auth/register
const API_BASE_URL = '/api';

export const createUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    // Use relative URL - Vite proxy will handle forwarding to backend
    const url = `${API_BASE_URL}/auth/register`;
    
    const response = await axios.post(url, userData, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating user:', error);
    console.error('Request URL was:', error.config?.url || 'unknown');
    
    // Handle network errors
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response) {
      const networkError = new Error('Network error: Unable to connect to server. Please check if the backend server is running on port 5000.');
      (networkError as any).isNetworkError = true;
      throw networkError;
    }
    
    throw error;
  }
};

export const fetchActivityLogs = async (page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/activities`, {
      params: { page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }
};

export default {
  createUser,
  fetchActivityLogs,
};
