import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, Users, DollarSign, Activity, Calendar, ArrowUpRight, Clock, FileText, UserPlus, Mail, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from 'date-fns';
import { fetchActivityLogs } from '@/services/api';

// Mock data - Replace with actual API calls in production
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastActive: '2025-07-14T15:30:00' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', lastActive: '2025-07-14T10:15:00' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', lastActive: '2025-07-10T09:45:00' },
];

const mockDonations = [
  { id: 1, amount: 100, donor: 'Alex Brown', date: '2025-07-14T14:30:00', status: 'completed' },
  { id: 2, amount: 250, donor: 'Sarah Wilson', date: '2025-07-13T11:20:00', status: 'completed' },
  { id: 3, amount: 50, donor: 'Mike Davis', date: '2025-07-12T16:45:00', status: 'pending' },
];

const mockActivities = [
  { id: 1, type: 'user', action: 'signed up', user: 'John Doe', time: '2025-07-14T15:30:00' },
  { id: 2, type: 'donation', action: 'received', amount: 100, user: 'Alex Brown', time: '2025-07-14T14:30:00' },
  { id: 3, type: 'content', action: 'updated', item: 'About Page', user: 'Jane Smith', time: '2025-07-14T10:15:00' },
];

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalDonations: 0,
    pendingDonations: 0,
    monthlyGoal: 10000,
    currentMonthDonations: 7500,
  });
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState<string | null>(null);

  // Simulate data loading
  useEffect(() => {
    if (authLoading) return;
    
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalUsers: 1287,
          activeUsers: 843,
          totalDonations: 45600,
          pendingDonations: 3,
          monthlyGoal: 10000,
          currentMonthDonations: 7500,
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      }
    };
    
    loadData();
  }, [authLoading]);

  // Fetch activity logs on mount
  useEffect(() => {
    if (authLoading) return;
    const loadActivities = async () => {
      setActivitiesLoading(true);
      setActivitiesError(null);
      try {
        const res = await fetchActivityLogs(1, 10) as { data: any[] };
        setActivities(res.data || []);
      } catch (err) {
        setActivitiesError('Failed to load activity logs');
      } finally {
        setActivitiesLoading(false);
      }
    };
    loadActivities();
  }, [authLoading]);

  // Handle authentication state and redirects
  useEffect(() => {
    // If still loading auth state, do nothing
    if (authLoading) return;

    // If no user is logged in, redirect to login
    if (!user) {
      navigate('/admin/login', { 
        replace: true,
        state: { from: window.location.pathname }
      });
      return;
    }

    // If user is not admin, redirect to home
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin dashboard.',
        variant: 'destructive',
      });
      navigate('/');
      return;
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Show loading state while checking auth or loading data
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If we get here, user is authenticated and is admin
  const progressPercentage = Math.min(
    Math.round((stats.currentMonthDonations / stats.monthlyGoal) * 100),
    100
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.email}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  await signOut();
                  navigate('/admin/login');
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeUsers} active users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalDonations)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingDonations} pending
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Goal</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.currentMonthDonations)}</div>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Target: {formatCurrency(stats.monthlyGoal)}</span>
                  <span>{progressPercentage}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
              <p className="text-xs text-muted-foreground">
                activities today
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest registered users</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <UserPlus className="mr-2 h-4 w-4" />
                Invite User
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {user.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(user.lastActive), 'MMM d')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <Button variant="ghost" size="sm" className="w-full">
                View all users
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest donations received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{donation.donor}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(donation.date), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatCurrency(donation.amount)}</p>
                      <Badge 
                        variant={donation.status === 'completed' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {donation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-3">
              <Button variant="ghost" size="sm" className="w-full">
                View all donations
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest activities in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activitiesLoading ? (
                  <p className="text-muted-foreground">Loading activities...</p>
                ) : activitiesError ? (
                  <p className="text-destructive">{activitiesError}</p>
                ) : activities.length === 0 ? (
                  <p className="text-muted-foreground">No recent activities.</p>
                ) : (
                  activities.map((activity: any) => (
                    <div key={activity._id} className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">
                            {activity.user?.email || 'Unknown'} {activity.action}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {activity.createdAt ? format(new Date(activity.createdAt), 'MMM d, h:mm a') : ''}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.details ? JSON.stringify(activity.details) : ''}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
