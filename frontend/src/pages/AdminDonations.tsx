import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LanguageContext } from '@/context/LanguageContext';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, DollarSign, Search, ArrowLeft, Filter } from 'lucide-react';
import PageHeader from "@/components/PageHeader";
import axios from '@/api/axios';
import { format } from 'date-fns';

interface Donation {
  _id: string;
  amount: number;
  userId?: {
    fullName: string;
    email: string;
  };
  status: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDonations = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { t } = useContext(LanguageContext);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (authLoading) return;

    if (!user || !isAdmin) {
      navigate('/admin/login');
      return;
    }

    loadDonations();
  }, [authLoading, user, isAdmin, navigate]);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/admin/payments');
      setDonations(response.data.data || []);
    } catch (error: any) {
      console.error('Error loading donations:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to load donations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      (donation.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (donation.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (donation.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesStatus = statusFilter === 'all' || donation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Donations Management" />
      
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <main className="py-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
        <div className="container mx-auto px-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>All Donations</CardTitle>
              <CardDescription>View and manage all donation payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by donor name, email, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                    <option value="FAILED">Failed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  Showing {filteredDonations.length} of {donations.length} donations
                </span>
                <span className="font-semibold text-green-600">
                  Total: {formatCurrency(totalAmount)}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {filteredDonations.map((donation) => (
              <Card key={donation._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {donation.userId?.fullName || 'Anonymous'}
                        </h3>
                        <p className="text-sm text-gray-600">{donation.userId?.email || 'No email'}</p>
                        {donation.description && (
                          <p className="text-sm text-gray-500 mt-1">{donation.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-500">
                            {format(new Date(donation.createdAt), 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">
                          {formatCurrency(donation.amount)}
                        </p>
                        <Badge 
                          variant={
                            donation.status === 'COMPLETED' ? 'default' : 
                            donation.status === 'PENDING' ? 'secondary' : 
                            'destructive'
                          }
                          className="mt-1"
                        >
                          {donation.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No donations found</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminDonations;

