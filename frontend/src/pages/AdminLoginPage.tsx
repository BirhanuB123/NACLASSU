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
import { Shield } from 'lucide-react';

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
        title: "Access Denied",
        description: "You don't have admin privileges.",
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
        description: "Please enter both email and password",
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
        title: "Login successful",
        description: "Redirecting to admin dashboard...",
      });
      
      // The useEffect will handle the actual navigation to /admin
      // after the auth state updates
      
    } catch (error: any) {
      console.error('[AdminLoginPage] Login error:', error);
      
      let errorMessage = "An error occurred during login";
      
      // Handle specific error cases
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (error.code) {
        errorMessage = error.message;
      }
      
      // Set the error state with the error message string
      setError(errorMessage);
      
      // Show error toast
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Sign in to access the administration dashboard</p>
          </div>
          <p className="text-sm">
            <Link to="/" className="font-medium text-primary hover:underline underline-offset-4">
              ← Back to main site
            </Link>
          </p>
        </div>
        
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={handleAdminLogin}>
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-sm font-medium">
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
                  placeholder="admin@nassu.org"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password" className="text-sm font-medium">
                    Admin Password
                  </Label>
                </div>
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10"
                />
              </div>
              <Button type="submit" className="w-full mt-2 bg-gold-500 hover:bg-gold-600 text-black" disabled={isLoading}>
                <Shield className="mr-2 h-4 w-4" />
                {isLoading ? 'Authenticating...' : 'Access Admin Dashboard'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Only authorized administrators can access this area!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;