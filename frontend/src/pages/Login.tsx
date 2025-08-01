import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [showPassword, setShowPassword] = useState(false);
  
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{
          backgroundImage: 'url("/lovable-uploads/5da4f0f9-ca7d-466d-a037-8073cbd0e04b.png")',
          filter: 'brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="w-full max-w-lg mx-4 z-20">
        <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-serif font-bold text-gray-900">
              {t('resetPassword')}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t('enterEmailForReset')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
              
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email" className="text-sm font-medium text-gray-700">
                    {t('Email')}
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder={t('your@email.com')}
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('sending')}
                      </>
                    ) : (
                      t('sendResetLink')
                    )}
                  </Button>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setShowForgotPassword(false)}
                >
                  {t('backToLogin')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const backgroundStyle = {
    backgroundImage: 'linear-gradient(120deg, rgba(0, 123, 255, 0.15) 0%, rgba(255, 255, 255, 0.1) 100%), url("/lovable-uploads/5da4f0f9-ca7d-466d-a037-8073cbd0e04b.png")',
    filter: 'brightness(0.7)'
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500" 
        style={backgroundStyle}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-blue-200/20 to-white/10 z-10" />
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      <div className="w-full max-w-lg mx-4 z-20">
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-4xl font-serif font-extrabold text-gray-900 dark:text-white drop-shadow-sm">
              {t('welcomeBack')}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              {t('Sign In to continue:')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold text-gray-700 dark:text-gray-200">{t('Email')}</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('name@example.com')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-semibold text-gray-700 dark:text-gray-200">
                    {t('password')}
                  </Label>
                  <button 
                    type="button" 
                    className="text-sm font-semibold text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    {t('Forgot password')}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="Password"
                    type={showPassword ? "text" : "Password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-4 pr-12 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/70 text-gray-900 dark:text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition-all duration-200" 
                disabled={isLoading || !!socialLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2"><Loader2 className="h-5 w-5 animate-spin" />{t('signingIn')}</span>
                ) : t('Sign in')}
              </Button>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white/80 dark:bg-gray-900/80 text-gray-500 dark:text-gray-300 font-medium">
                    {t('or continue with:')}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/80 text-gray-800 dark:text-gray-100 font-semibold text-base hover:bg-blue-50 dark:hover:bg-gray-800/60 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm transition-all"
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
                  type="button" 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white font-semibold text-base hover:from-gray-800 hover:to-black shadow-sm transition-all"
                  onClick={handleAppleSignIn}
                  disabled={!!socialLoading}
                >
                  {socialLoading === 'apple' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <FaApple className="h-5 w-5" />
                  )}
                  {t('Continue with Apple')}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              {t('Have not an account?')}{' '}
              <Link 
                to="/signup" 
                className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
              >
                {t('Sign Up')}
              </Link>
            </p>
            <div className="w-full text-center text-xs text-gray-500 dark:text-gray-400">
              {t('Terms and Privacy', {
                terms: <a href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">{t('terms')}</a>,
                privacy: <a href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">{t('privacy')}</a>
              })}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;