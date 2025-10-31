import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
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
