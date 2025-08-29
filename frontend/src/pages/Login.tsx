import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
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
import { LanguageContext } from '@/context/LanguageContext';

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
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  
  // Handle email/password login
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t('login_page.error'),
        description: t('login_page.please_fill_fields'),
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: t('login_page.success'),
        description: t('login_page.logged_in_successfully'),
      });
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: t('login_page.login_failed'),
        description: error.message || t('login_page.failed_to_sign_in'),
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
        title: t('login_page.success'),
        description: t('login_page.logged_in_with_google'),
      });
      navigate('/');
    } catch (error: any) {
      console.error('Google sign in error:', error);
      toast({
        title: t('login_page.login_failed'),
        description: error.message || t('login_page.failed_google_sign_in'),
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
        title: t('login_page.success'),
        description: t('login_page.logged_in_with_apple'),
      });
      navigate('/');
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      toast({
        title: t('login_page.login_failed'),
        description: error.message || t('login_page.failed_apple_sign_in'),
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
        title: t('login_page.email_required'),
        description: t('login_page.please_fill_fields'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: t('login_page.success'),
        description: t('login_page.password_reset_sent'),
      });
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: t('login_page.error'),
        description: error.message || t('login_page.failed_to_send_reset'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show forgot password form if needed
  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="w-full max-w-md mx-4 z-20">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
            
            <CardHeader className="space-y-3 text-center pt-8 pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {t('login_page.reset_password')}
              </CardTitle>
              <CardDescription className="text-gray-600 text-base leading-relaxed">
                {t('login_page.enter_email_for_reset')}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="reset-email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('login_page.email')}
                  </Label>
                  <div className="relative">
                    <Input
                      id="reset-email"
                      type="email"
                      className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg"
                      placeholder={t('login_page.your_email_placeholder')}
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t('login_page.sending')}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        {t('login_page.send_reset_link')}
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-3 rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                  onClick={() => setShowForgotPassword(false)}
                >
                  {t('login_page.back_to_login')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-lg mx-4 z-20">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
          
          <CardHeader className="space-y-4 text-center pt-8 pb-6">
            {/* Logo/Icon */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              {t('login_page.title')}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg leading-relaxed">
              {t('login_page.subtitle')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('login_page.email')}
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('login_page.name_email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </div>
              
              {/* Password Field */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t('login_page.password')}
                  </Label>
                  <button 
                    type="button" 
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg px-2 py-1 transition-all duration-300"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    {t('login_page.forgot_password')}
                  </button>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-300"
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
              
              {/* Sign In Button */}
              <Button 
                type="submit" 
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:hover:translate-y-0" 
                disabled={isLoading || !!socialLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('login_page.signing_in')}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    {t('login_page.sign_in')}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
              
              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/90 text-gray-500 font-medium">
                    {t('login_page.or_continue_with')}
                  </span>
                </div>
              </div>
              
              {/* Social Login Buttons */}
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 text-gray-800 font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" 
                  onClick={handleGoogleSignIn} 
                  disabled={isLoading || socialLoading === 'apple'}
                >
                  {socialLoading === 'google' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <FcGoogle className="h-6 w-6" />
                      {t('login_page.continue_with_google')}
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1" 
                  onClick={handleAppleSignIn}
                  disabled={!!socialLoading}
                >
                  {socialLoading === 'apple' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <FaApple className="h-6 w-6" />
                      {t('login_page.continue_with_apple')}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-6 px-8 pb-8">
            <p className="text-center text-gray-600">
              {t('login_page.no_account')}{' '}
              <Link 
                to="/signup" 
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-300"
              >
                {t('login_page.sign_up')}
              </Link>
            </p>
            
            <div className="w-full text-center text-xs text-gray-500">
              {t('login_page.terms_and_privacy', {
                terms: t('login_page.terms'),
                privacy: t('login_page.privacy')
              })}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;