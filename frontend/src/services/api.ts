import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const createUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default {
  createUser,
};
