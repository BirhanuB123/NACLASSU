import axios from '../api/axios';

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalDonations: number;
  pendingDonations: number;
  monthlyGoal: number;
  currentMonthDonations: number;
  recentActivities: number;
}

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface DashboardDonation {
  id: string;
  amount: number;
  donor: string;
  email: string;
  date: string;
  status: string;
  description: string;
}

export interface DashboardActivity {
  _id: string;
  action: string;
  user: {
    _id: string;
    email: string;
    role: string;
  };
  details?: any;
  createdAt: string;
}

export interface UserGrowthData {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  count: number;
}

export interface DonationTrendsData {
  _id: {
    year: number;
    month: number;
    day: number;
  };
  total: number;
  count: number;
}

// Dashboard Statistics
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await axios.get('/api/admin/dashboard/stats');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Recent Users
export const fetchRecentUsers = async (limit: number = 5): Promise<DashboardUser[]> => {
  try {
    const response = await axios.get(`/api/admin/dashboard/users?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recent users:', error);
    throw error;
  }
};

// Recent Donations
export const fetchRecentDonations = async (limit: number = 5): Promise<DashboardDonation[]> => {
  try {
    const response = await axios.get(`/api/admin/dashboard/donations?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recent donations:', error);
    throw error;
  }
};

// Recent Activities
export const fetchRecentActivities = async (limit: number = 10): Promise<DashboardActivity[]> => {
  try {
    const response = await axios.get(`/api/admin/dashboard/activities?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error;
  }
};

// User Growth Data
export const fetchUserGrowthData = async (days: number = 30): Promise<UserGrowthData[]> => {
  try {
    const response = await axios.get(`/api/admin/dashboard/user-growth?days=${days}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user growth data:', error);
    throw error;
  }
};

// Donation Trends Data
export const fetchDonationTrendsData = async (days: number = 30): Promise<DonationTrendsData[]> => {
  try {
    const response = await axios.get(`/api/admin/dashboard/donation-trends?days=${days}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching donation trends data:', error);
    throw error;
  }
};

// Activity Logs (existing function, but updated)
export const fetchActivityLogs = async (page: number = 1, limit: number = 20): Promise<{ data: DashboardActivity[]; pagination: any }> => {
  try {
    const response = await axios.get(`/api/admin/activities?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    throw error;
  }
};
