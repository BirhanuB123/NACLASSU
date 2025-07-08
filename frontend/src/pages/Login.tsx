import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Apple, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  // Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Handle email/password login
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t('Error'),
        description: t('Please fill in all fields'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: t('Success'),
        description: t('Logged in successfully!'),
      });
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: t('Login Failed'),
        description: error.message || t('Failed to sign in'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    setSocialLoading('google');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: t('Success'),
        description: t('Logged in with Google!'),
      });
      navigate('/');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast({
        title: t('Login Failed'),
        description: error.message || t('Failed to sign in with Google'),
        variant: 'destructive',
      });
    } finally {
      setSocialLoading('');
    }
  };
  
  // Handle Apple sign in
  const handleAppleSignIn = async () => {
    setSocialLoading('apple');
    try {
      const provider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, provider);
      toast({
        title: t('Success'),
        description: t('Logged in with Apple!'),
      });
      navigate('/');
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      toast({
        title: t('Login Failed'),
        description: error.message || t('Failed to sign in with Apple'),
        variant: 'destructive',
      });
    } finally {
      setSocialLoading('');
    }
  };

  // Handle password reset
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast({
        title: t('Email Required'),
        description: t('Please enter your email to reset your password'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: t('Success'),
        description: t('Password reset email sent. Please check your inbox.'),
      });
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: t('Error'),
        description: error.message || t('Failed to send reset email'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show forgot password form if needed
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('Reset Password')}
                </h1>
                <p className="text-gray-600">
                  {t('Enter your email to receive a password reset link')}
                </p>
              </div>
              
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">{t('Email')}</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder={t('your@email.com')}
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? t('Sending...') : t('Send Reset Link')}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setShowForgotPassword(false)}
                >
                  {t('Back to Login')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('Welcome Back')}
              </h1>
              <p className="text-gray-600">
                {t('Sign in to your account to continue')}
              </p>
            </div>
            
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('Email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('name@example.com')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('Password')}</Label>
                  <button 
                    type="button" 
                    className="text-sm font-medium text-primary hover:underline" 
                    onClick={() => setShowForgotPassword(true)}
                  >
                    {t('Forgot password?')}
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !!socialLoading}
              >
                {isLoading ? t('Signing in...') : t('Sign in')}
              </Button>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    {t('Or continue with')}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-3 py-6 text-base"
                  onClick={handleGoogleSignIn} 
                  disabled={isLoading || socialLoading === 'apple'}
                >
                  {socialLoading === 'google' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <FcGoogle className="h-5 w-5" />
                      {t('Continue with Google')}
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-3 py-6 text-base"
                  onClick={handleAppleSignIn} 
                  disabled={isLoading || socialLoading === 'google'}
                >
                  {socialLoading === 'apple' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Apple className="h-5 w-5" />
                      {t('Continue with Apple')}
                    </>
                  )}
                </Button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              {t("Don't have an account?")}{' '}
              <Link 
                to="/signup" 
                className="font-medium text-primary hover:underline"
              >
                {t('Sign up')}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;