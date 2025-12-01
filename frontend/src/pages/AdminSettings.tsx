import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LanguageContext } from '@/context/LanguageContext';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft, Save, Bell, Database, DollarSign } from 'lucide-react';
import PageHeader from "@/components/PageHeader";

const AdminSettings = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { t } = useContext(LanguageContext);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    monthlyGoal: 10000,
    emailNotifications: true,
    activityLogRetention: 90,
  });

  useEffect(() => {
    if (authLoading) return;

    if (!user || !isAdmin) {
      navigate('/admin/login');
      return;
    }
  }, [authLoading, user, isAdmin, navigate]);

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been saved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title="Admin Settings" />
      
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
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Donation Goals</CardTitle>
                  <CardDescription>Configure monthly donation targets</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="monthlyGoal">Monthly Goal ($)</Label>
                <Input
                  id="monthlyGoal"
                  type="number"
                  value={settings.monthlyGoal}
                  onChange={(e) => setSettings({ ...settings, monthlyGoal: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Manage email notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Database className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Configure data retention and storage</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="retention">Activity Log Retention (days)</Label>
                <Input
                  id="retention"
                  type="number"
                  value={settings.activityLogRetention}
                  onChange={(e) => setSettings({ ...settings, activityLogRetention: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Activity logs older than this will be automatically archived
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate('/admin')}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminSettings;

