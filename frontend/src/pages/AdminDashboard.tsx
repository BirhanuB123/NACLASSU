import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LanguageContext } from '@/context/LanguageContext';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, Users, DollarSign, Activity, Calendar, ArrowUpRight, Clock, FileText, UserPlus, Mail, Settings, Shield, LogOut, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from 'date-fns';
import PageHeader from "@/components/PageHeader";
import { 
  fetchDashboardStats, 
  fetchRecentUsers, 
  fetchRecentDonations, 
  fetchRecentActivities,
  fetchUserGrowthData,
  fetchDonationTrendsData,
  type DashboardStats,
  type DashboardUser,
  type DashboardDonation,
  type DashboardActivity
} from '@/services/adminApi';

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { t } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalDonations: 0,
    pendingDonations: 0,
    monthlyGoal: 10000,
    currentMonthDonations: 0,
    recentActivities: 0
  });
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [donations, setDonations] = useState<DashboardDonation[]>([]);
  const [activities, setActivities] = useState<DashboardActivity[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all dashboard data
  const loadDashboardData = async (isRefresh: boolean = false) => {
    try {
      setError(null);
      
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      // Load data in parallel for better performance
      const [statsData, usersData, donationsData, activitiesData] = await Promise.all([
        fetchDashboardStats(),
        fetchRecentUsers(5),
        fetchRecentDonations(5),
        fetchRecentActivities(10)
      ]);

      setStats(statsData);
      setUsers(usersData);
      setDonations(donationsData);
      setActivities(activitiesData);

    } catch (error: any) {
      console.error('Failed to load dashboard data:', error);
      setError(error.message || 'Failed to load dashboard data');
      toast({
        title: 'Error',
        description: error.message || 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setUsersLoading(false);
      setDonationsLoading(false);
      setActivitiesLoading(false);
    }
  };

  // Load dashboard data on mount
  useEffect(() => {
    if (authLoading) return;
    loadDashboardData();
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
        title: t('admin_dashboard.error_messages.access_denied'),
        description: t('admin_dashboard.error_messages.no_permission'),
        variant: 'destructive',
      });
      navigate('/');
      return;
    }
  }, [user, isAdmin, authLoading, navigate]);

  // Handle refresh
  const handleRefresh = () => {
    loadDashboardData(true);
  };

  // Show loading state while checking auth or loading data
  if (authLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-lg">
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('admin_dashboard.loading_dashboard')}
            </h2>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
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
    <>
      <PageHeader title={t('admin_dashboard.title')} background="">
        <p className="text-lg text-gray-100">
          {t('admin_dashboard.welcome_back', { email: user?.email })}
        </p>
      </PageHeader>

      {/* Admin Navigation Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hidden sm:flex"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="mr-2 h-4 w-4" />
                {t('admin_dashboard.settings')}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  await signOut();
                  navigate('/admin/login');
                }}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {t('admin_dashboard.sign_out')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm font-bold">!</span>
                </div>
                <p className="text-red-700">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setError(null)}
                  className="ml-auto text-red-600 border-red-200 hover:bg-red-50"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          )}

          {/* Enhanced Stats Overview */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {t('admin_dashboard.stats.total_users')}
                </CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-sm text-gray-600">
                  {stats.activeUsers} {t('admin_dashboard.stats.active_users')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {t('admin_dashboard.stats.donations')}
                </CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(stats.totalDonations)}</div>
                <p className="text-sm text-gray-600">
                  {stats.pendingDonations} {t('admin_dashboard.stats.pending')}
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {t('admin_dashboard.stats.monthly_goal')}
                </CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-3">{formatCurrency(stats.currentMonthDonations)}</div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{t('admin_dashboard.stats.target', { amount: formatCurrency(stats.monthlyGoal) })}</span>
                    <span className="font-medium">{progressPercentage}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 bg-gray-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-gray-700">
                  {t('admin_dashboard.stats.recent_activity')}
                </CardTitle>
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stats.recentActivities}</div>
                <p className="text-sm text-gray-600">
                  {t('admin_dashboard.stats.activities_today')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Content Grid */}
          <div className="grid gap-8 md:grid-cols-2 mb-12">
            {/* Recent Users */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {t('admin_dashboard.recent_users.title')}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {t('admin_dashboard.recent_users.description')}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-9 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t('admin_dashboard.recent_users.invite_user')}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {usersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  </div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No users found</p>
                  </div>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={user.status === 'active' ? 'default' : 'secondary'} 
                          className="text-xs px-2 py-1"
                        >
                          {t(`admin_dashboard.recent_users.role.${user.role.toLowerCase()}`)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {format(new Date(user.lastActive), 'MMM d')}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-100 px-6 py-4">
                <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  {t('admin_dashboard.recent_users.view_all_users')}
                </Button>
              </CardFooter>
            </Card>

            {/* Recent Donations */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">
                  {t('admin_dashboard.recent_donations.title')}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {t('admin_dashboard.recent_donations.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {donationsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-green-600" />
                  </div>
                ) : donations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No donations found</p>
                  </div>
                ) : (
                  donations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-full">
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-none text-gray-900">{donation.donor}</p>
                          <p className="text-sm text-gray-600">
                            {format(new Date(donation.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(donation.amount)}</p>
                        <Badge 
                          variant={donation.status === 'COMPLETED' ? 'default' : 'outline'}
                          className="text-xs px-2 py-1"
                        >
                          {t(`admin_dashboard.recent_donations.status.${donation.status.toLowerCase()}`)}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-100 px-6 py-4">
                <Button variant="ghost" size="sm" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  {t('admin_dashboard.recent_donations.view_all_donations')}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">
                {t('admin_dashboard.recent_activity.title')}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {t('admin_dashboard.recent_activity.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activitiesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <p className="text-gray-600">{t('admin_dashboard.recent_activity.loading_activities')}</p>
                  </div>
                </div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">{t('admin_dashboard.recent_activity.no_activities')}</p>
                </div>
              ) : (
                activities.map((activity) => (
                  <div key={activity._id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user?.email || t('admin_dashboard.recent_activity.unknown_user')} {activity.action}
                        </p>
                        <span className="text-xs text-gray-500">
                          {activity.createdAt ? format(new Date(activity.createdAt), 'MMM d, h:mm a') : ''}
                        </span>
                      </div>
                      {activity.details && (
                        <p className="text-sm text-gray-600 mt-1">
                          {typeof activity.details === 'string' ? activity.details : JSON.stringify(activity.details)}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
