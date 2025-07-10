import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NewsManagement from "@/components/admin/NewsManagement";
import TeamManagement from "@/components/admin/TeamManagement";
import { BarChart3, Users, DollarSign, FileText, Shield, Search, Download, PlusCircle } from 'lucide-react';

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

import { User } from '@/types';

const AdminDashboard = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin, user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Stats for the dashboard cards
  const stats = [
    { title: 'Total Donations', value: '$12,540', icon: <DollarSign className="h-6 w-6 text-muted-foreground" />, change: '+12% from last month' },
    { title: 'Active Users', value: '1,234', icon: <Users className="h-6 w-6 text-muted-foreground" />, change: '+5% from last month' },
    { title: 'News Articles', value: '42', icon: <FileText className="h-6 w-6 text-muted-foreground" />, change: '3 new this week' },
    { title: 'Admin Users', value: '8', icon: <Shield className="h-6 w-6 text-muted-foreground" />, change: 'No change' },
  ];

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
    if (!isAdmin && !loading) {
      navigate('/');
      toast({
        title: "Unauthorized",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [isAdmin, loading, navigate]);

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
      <div className="min-h-screen bg-muted/40">
        <header className="border-b bg-background shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Welcome back, {user?.first_name || 'Admin'}. Loading your dashboard...
              </p>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm">
              Welcome back, {user?.first_name || 'Admin'}. Here's what's happening with your organization.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-5 w-5 text-muted-foreground">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 bg-muted/50 p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <DollarSign className="h-4 w-4" />
              <span>Donations</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4" />
              <span>News</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2 rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" />
              <span>Team</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Overview of the latest activities in your organization.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {sampleDonations.slice(0, 3).map((donation) => (
                    <div key={donation.id} className="flex items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          New donation of ${donation.amount} {donation.currency}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(donation.donation_date || '').toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader className="border-b px-6 py-4">
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="text-lg">Donations</CardTitle>
                    <CardDescription className="text-sm">Manage and track all donations received.</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-60">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search donations..."
                        className="pl-8 w-full"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Export</span>
                      <span className="sr-only sm:hidden">Export</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="h-10 font-medium text-muted-foreground">Transaction</TableHead>
                        <TableHead className="h-10 font-medium text-muted-foreground">Amount</TableHead>
                        <TableHead className="h-10 font-medium text-muted-foreground">Date</TableHead>
                        <TableHead className="h-10 font-medium text-muted-foreground">Status</TableHead>
                        <TableHead className="h-10 font-medium text-right text-muted-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleDonations.map((donation) => (
                        <TableRow key={donation.id} className="hover:bg-muted/50">
                          <TableCell className="py-4">
                            <div className="font-medium text-foreground">#{donation.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {donation.designation || 'General Donation'}
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="font-medium text-foreground">${donation.amount}</span>
                            <span className="text-muted-foreground"> {donation.currency}</span>
                          </TableCell>
                          <TableCell className="py-4 text-muted-foreground">
                            {donation.donation_date ? new Date(donation.donation_date).toLocaleDateString() : 'N/A'}
                          </TableCell>
                          <TableCell className="py-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              donation.status === 'completed' 
                                ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-between px-6 py-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">1-{sampleDonations.length}</span> of <span className="font-medium">{sampleDonations.length}</span> donations
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-8" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage all registered users and their permissions.</CardDescription>
                  </div>
                  <Button size="sm" className="mt-4 md:mt-0">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="pl-8 w-full md:w-[300px]"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="font-medium">{user.first_name} {user.last_name}</div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === 'admin' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 px-2">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsManagement />
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <TeamManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;