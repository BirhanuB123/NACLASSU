import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { Shield, Lock, ArrowLeft } from 'lucide-react';
import PageHeader from "@/components/PageHeader";

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    // Only run this effect when auth state changes
    if (authLoading) return;
    
    console.log('[AdminLoginPage] Auth state changed', { 
      user: user ? 'User exists' : 'No user',
      isAdmin,
      path: window.location.pathname 
    });

    // If user is logged in but not an admin, redirect to home
    if (user && !isAdmin) {
      console.log('[AdminLoginPage] User is not an admin, redirecting to home');
      navigate('/', { replace: true });
      return;
    }

    // If user is logged in and is admin, and we're on the login page, redirect to admin dashboard
    if (user && isAdmin && window.location.pathname === '/admin/login') {
      console.log('[AdminLoginPage] User is admin, redirecting to /admin');
      navigate('/admin', { replace: true });
      return;
    }
    
    // If user is logged in but not admin, show message but stay on login page
    if (user) {
      console.log('[AdminLoginPage] User is not admin, showing access denied');
      toast({
        title: t('admin_page.access_denied'),
        description: t('admin_page.no_admin_privileges'),
        variant: "destructive",
      });
      return;
    }
    
    // If no user is logged in, ensure we're on the login page
    if (window.location.pathname !== '/admin/login') {
      console.log('[AdminLoginPage] No user, ensuring on login page');
      navigate('/admin/login', { replace: true });
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: t('admin_page.validation.enter_both'),
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    console.log('[AdminLoginPage] Attempting login with email:', email);

    try {
      // Clear any previous errors
      setError(null);
      
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      if (!firebaseUser) {
        throw new Error('No user returned from authentication');
      }
      
      console.log('[AdminLoginPage] Login successful, user:', firebaseUser.email);
      
      // Show success message
      toast({
        title: t('admin_page.login_successful'),
        description: t('admin_page.redirecting_dashboard'),
      });
      
      // The useEffect will handle the actual navigation to /admin
      // after the auth state updates
      
    } catch (error: any) {
      console.error('[AdminLoginPage] Login error:', error);
      
      let errorMessage = t('admin_page.validation.general_error');
      
      // Handle specific error cases
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = t('admin_page.validation.invalid_credentials');
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = t('admin_page.validation.too_many_attempts');
      } else if (error.code) {
        errorMessage = error.message;
      }
      
      // Set the error state with the error message string
      setError(errorMessage);
      
      // Show error toast
      toast({
        title: t('admin_page.login_failed'),
        description: errorMessage,
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader title={t('admin_page.admin_access')} background="">
        <p className="text-lg text-gray-100">{t('admin_page.sign_in_dashboard')}</p>
      </PageHeader>

      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('admin_page.admin_access')}
              </h2>
              <p className="text-gray-600">
                {t('admin_page.authorized_only')}
              </p>
            </div>

            {/* Login Form Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleAdminLogin}>
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-sm font-medium text-gray-700">
                      {t('admin_page.admin_email')}
                    </Label>
                    <Input
                      id="admin-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('admin_page.email_placeholder')}
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-sm font-medium text-gray-700">
                      {t('admin_page.admin_password')}
                    </Label>
                    <Input
                      id="admin-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl transition-all duration-200"
                    />
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {t('admin_page.authenticating')}
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        {t('admin_page.access_dashboard')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Back to Main Site Link */}
            <div className="text-center mt-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('admin_page.back_to_main')}
              </Link>
            </div>

            {/* Security Notice */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-gray-400" />
                <span>{t('admin_page.authorized_only')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLoginPage;