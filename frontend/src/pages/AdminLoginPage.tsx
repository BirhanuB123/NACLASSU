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