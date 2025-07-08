import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
//import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
//import { Database } from "@/integrations/supabase/types";
import NewsManagement from "@/components/admin/NewsManagement";
import TeamManagement from "@/components/admin/TeamManagement";
import { BarChart3, Users, DollarSign, FileText, Shield } from 'lucide-react';

interface Donation {
  id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  transaction_id: string | null;
  donation_date: string | null;
  recurring: boolean | null;
  frequency: string | null;
  designation: string | null;
  note: string | null;
  user_id: string | null;
}

interface User {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: 'user' | 'admin';
}

const AdminDashboard = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const { isAdmin, user } = useAuth();
  const navigate = useNavigate();

  // Sample data for demonstration
  const sampleDonations: Donation[] = [
    {
      id: '1',
      amount: 100,
      currency: 'USD',
      payment_method: 'credit_card',
      status: 'completed',
      transaction_id: 'txn_123456',
      donation_date: '2024-01-15T10:30:00Z',
      recurring: false,
      frequency: null,
      designation: 'General Fund',
      note: 'Monthly donation',
      user_id: 'user_1'
    },
    {
      id: '2',
      amount: 250,
      currency: 'USD',
      payment_method: 'paypal',
      status: 'completed',
      transaction_id: 'txn_789012',
      donation_date: '2024-01-14T14:22:00Z',
      recurring: true,
      frequency: 'monthly',
      designation: 'Education Program',
      note: null,
      user_id: 'user_2'
    }
  ];

  const sampleUsers: User[] = [
    {
      id: 'user_1',
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      role: 'user'
    },
    {
      id: 'user_2',
      email: 'admin@nassu.org',
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin'
    }
  ];

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin && !isLoading) {
      navigate('/');
      toast({
        title: "Unauthorized",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      setDonations(sampleDonations);
      setUsers(sampleUsers);
      setIsLoading(false);
    }
  }, [isAdmin, user]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const handleUpdateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const response = await fetch('/api/users/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user role');
      }

      const updatedUser = await response.json();
      
      // Update the local state with the updated user
      setUsers(users.map(u => u.id === userId ? { ...u, role: updatedUser.role } : u));
      
      toast({
        title: "Role updated",
        description: "User role has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User deleted",
      description: "User has been deleted successfully.",
    });
  };

  const handleUpdateDonationStatus = (donationId: string, newStatus: string) => {
    setDonations(donations.map(d => d.id === donationId ? { ...d, status: newStatus } : d));
    toast({
      title: "Status updated",
      description: "Donation status has been updated successfully.",
    });
  };

  // Filter users and donations based on filter value
  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(filterValue.toLowerCase()) ||
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(filterValue.toLowerCase())
  );
  const filteredDonations = donations.filter(donation => 
    donation.designation?.toLowerCase().includes(filterValue.toLowerCase()) ||
    donation.status.toLowerCase().includes(filterValue.toLowerCase()) ||
    donation.payment_method.toLowerCase().includes(filterValue.toLowerCase())
  );

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const totalUsers = users.length;
  const pendingDonations = donations.filter(d => d.status === 'pending').length;

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto text-blue-700 mb-4" />
          <p>Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-blue-700" />
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-xl shadow mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Donations</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{formatCurrency(totalDonations)}</div>
                  <p className="text-xs text-gray-400">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{totalUsers}</div>
                  <p className="text-xs text-gray-400">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Pending Donations</CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{pendingDonations}</div>
                  <p className="text-xs text-gray-400">
                    Requires attention
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">Active</CardTitle>
                  <FileText className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">573</div>
                  <p className="text-xs text-gray-400">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white shadow-lg rounded-2xl border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-900">Recent Activity</CardTitle>
                <CardDescription className="text-gray-500">
                  Latest actions and updates from your admin panel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">New donation received</p>
                      <p className="text-sm text-gray-600">$100 from John Doe</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">New user registered</p>
                      <p className="text-sm text-gray-600">admin@nassu.org</p>
                    </div>
                    <span className="text-sm text-gray-500">4 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">News article published</p>
                      <p className="text-sm text-gray-600">Latest community updates</p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">Donation Records</h2>
                <p className="text-gray-600">Manage and track all donations</p>
              </div>
              <div className="flex gap-4">
                <Button variant="outline">Export CSV</Button>
                <Button>Generate Report</Button>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="filter" className="sr-only">Filter</Label>
              <Input
                id="filter"
                placeholder="Filter donations..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {filteredDonations.length === 0 ? (
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-100">
                <CardContent className="text-center py-8">
                  <DollarSign className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-500">No donations found</p>
                  <p className="text-sm text-gray-400">Donations will appear here when received</p>
                </CardContent>
              </Card>
            ) : (
              <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Recurring</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>{formatDate(donation.donation_date)}</TableCell>
                        <TableCell>{formatCurrency(donation.amount, donation.currency)}</TableCell>
                        <TableCell className="capitalize">{donation.payment_method.replace('_', ' ')}</TableCell>
                        <TableCell>
                          <select 
                            value={donation.status}
                            onChange={(e) => handleUpdateDonationStatus(donation.id, e.target.value)}
                            className="px-2 py-1 rounded text-xs font-medium border"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </TableCell>
                        <TableCell>{donation.designation || 'General'}</TableCell>
                        <TableCell>
                          {donation.recurring ? `Yes (${donation.frequency})` : 'No'}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-blue-900">User Management</h2>
                <p className="text-gray-600">Manage user accounts and permissions</p>
              </div>
              <Button>Add New User</Button>
            </div>

            <div className="mb-4">
              <Label htmlFor="filter" className="sr-only">Filter</Label>
              <Input
                id="filter"
                placeholder="Filter users..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="max-w-sm"
              />
            </div>

            {filteredUsers.length === 0 ? (
              <Card className="bg-white shadow-lg rounded-2xl border border-gray-100">
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-500">No users found</p>
                  <p className="text-sm text-gray-400">Users will appear here when they register</p>
                </CardContent>
              </Card>
            ) : (
              <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'N/A'}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <select 
                            value={user.role}
                            onChange={(e) => handleUpdateUserRole(user.id, e.target.value as 'user' | 'admin')}
                            className="px-2 py-1 rounded text-xs font-medium border"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <NewsManagement />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <TeamManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;