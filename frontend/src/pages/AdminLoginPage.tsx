import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Shield } from 'lucide-react';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    // Redirect if user is already logged in and is admin
    if (user && isAdmin) {
      navigate('/admin');
    } else if (user && !isAdmin) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
    }
  }, [user, isAdmin, navigate]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The redirect will happen in the useEffect above
      toast({
        title: "Admin login successful",
        description: "Welcome to the admin dashboard",
      });
    } catch (error: any) {
      console.error('Admin login error:', error);
      toast({
        title: "Admin login failed",
        description: error.message || "Invalid admin credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-700 drop-shadow-md" />
          </div>
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Admin Access</h2>
          <p className="text-base text-gray-700">Sign in to access the administration dashboard</p>
          <p className="mt-2 text-xs">
            <Link to="/" className="text-blue-700 hover:text-blue-500 transition-colors font-medium">
              ← Back to main site
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleAdminLogin}>
          <div>
            <Label htmlFor="admin-email" className="block text-sm font-semibold text-blue-700 mb-1">
              Admin Email
            </Label>
            <Input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
              placeholder="admin@nassu.org"
            />
          </div>
          <div>
            <Label htmlFor="admin-password" className="block text-sm font-semibold text-blue-700 mb-1">
              Admin Password
            </Label>
            <Input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
            />
          </div>
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-md"
            >
              <Shield className="h-4 w-4 mr-2" />
              {isLoading ? 'Authenticating...' : 'Access Admin Dashboard'}
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 font-medium">
            Only authorized administrators can access this area!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;