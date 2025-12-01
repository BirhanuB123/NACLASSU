import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from '@/context/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, User, UserCheck } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  OAuthProvider,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { createUser } from '@/services/api';

const SignUpPage = () => {
  const { t } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordError(t('signup_page.passwords_not_match'));
      return;
    }
    
    setIsLoading(true);
    setPasswordError('');

    try {
      // 1. Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Update the user's display name in Firebase
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
      });

      // 3. Send email verification
      await sendEmailVerification(user);

      // 4. Save user data to MongoDB
      await createUser({
        fullName: `${firstName} ${lastName}`,
        email: email,
        password: password // This will be hashed by the backend
      });

      // 5. Sign out the user to force them to verify their email before logging in
      await auth.signOut();

      toast({
        title: t('signup_page.sign_up_successful'),
        description: (
          <div>
            <p>{t('signup_page.verification_email_sent', { email })}</p>
            <p className="mt-2">{t('signup_page.verify_email_before_login')}</p>
          </div>
        ),
      });

      // Redirect to login page
      navigate('/login');
    } catch (error: any) {
      console.error('Sign up error:', error);
      
      // Try to clean up Firebase user if MongoDB save failed
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (deleteError) {
          console.error('Error cleaning up Firebase user:', deleteError);
        }
      }
      
      // Handle different types of errors
      let errorMessage = t('signup_page.sign_up_error');
      
      if (error.isNetworkError || error.code === 'ECONNABORTED' || error.message?.includes('Network Error') || !error.response) {
        errorMessage = 'Network error: Unable to connect to the server. Please check if the backend server is running on port 5000.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.code) {
        // Firebase error codes
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please use a different email or try logging in.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address. Please enter a valid email.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please use a stronger password.';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Network error: Unable to connect to Firebase. Please check your internet connection.';
            break;
          default:
            errorMessage = error.message || t('signup_page.sign_up_error');
        }
      }
      
      toast({
        title: t('signup_page.sign_up_failed'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setSocialLoading('google');
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Save user data to MongoDB
      if (user.email) {
        await createUser({
          fullName: user.displayName || 'Google User',
          email: user.email,
          password: 'google-auth' // This will be hashed but not used for authentication
        });
      }
      
      toast({
        title: t('signup_page.sign_up_successful'),
        description: t('signup_page.account_created_successfully'),
      });

      // Redirect to home for social login since they're already authenticated
      navigate('/');
    } catch (error: any) {
      console.error('Google sign up error:', error);
      
      // Clean up Firebase user if MongoDB save failed
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (deleteError) {
          console.error('Error cleaning up Firebase user:', deleteError);
        }
      }
      
      const errorMessage = error.response?.data?.message || error.message || t('signup_page.google_sign_up_failed');
      toast({
        title: t('signup_page.sign_up_failed'),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSocialLoading('');
    }
  };

  const handleAppleSignUp = async () => {
    setSocialLoading('apple');
    
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      
      await signInWithPopup(auth, provider);
      
      toast({
        title: t('signup_page.sign_up_successful'),
        description: t('signup_page.account_created'),
      });

      // Redirect to home for social login since they're already authenticated
      navigate('/');
    } catch (error: any) {
      console.error('Apple sign up error:', error);
      toast({
        title: t('signup_page.sign_up_failed'),
        description: error.message || t('signup_page.sign_up_error'),
        variant: "destructive",
      });
    } finally {
      setSocialLoading('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="w-full max-w-2xl mx-4 z-20">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden">
          {/* Gradient Top Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
          
          <CardHeader className="space-y-4 text-center pt-8 pb-6">
            {/* Logo/Icon */}
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <UserCheck className="w-10 h-10 text-white" />
            </div>
            
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              {t('signup_page.title')}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg leading-relaxed">
              {t('signup_page.subtitle')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form className="space-y-6" onSubmit={handleSignUp}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="first-name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('signup_page.first_name')} <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative group">
                    <Input
                      id="first-name"
                      name="firstName"
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300"
                      placeholder={t('signup_page.first_name_placeholder')}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="last-name" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('signup_page.last_name')} <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative group">
                    <Input
                      id="last-name"
                      name="lastName"
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300"
                      placeholder={t('signup_page.last_name_placeholder')}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t('signup_page.email_address')} <span className="text-red-500">*</span>
                </Label>
                <div className="relative group">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300"
                    placeholder={t('signup_page.email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t('signup_page.password')} <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300 ${
                        passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder={t('signup_page.password_placeholder')}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError('');
                      }}
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

                <div className="space-y-3">
                  <Label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {t('signup_page.confirm_password')} <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative group">
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`w-full pl-12 pr-12 py-4 rounded-2xl border-2 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-lg group-hover:border-blue-300 ${
                        passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'
                      }`}
                      placeholder={t('signup_page.password_placeholder')}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (passwordError) setPasswordError('');
                      }}
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none transition-colors duration-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Error Message */}
              {passwordError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-sm text-red-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {passwordError}
                  </p>
                </div>
              )}

              {/* Sign Up Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:transform-none disabled:hover:translate-y-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t('signup_page.creating_account')}
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      {t('signup_page.sign_up')}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/90 text-gray-500 font-medium">
                  {t('signup_page.or_continue_with')}
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 text-gray-800 font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                onClick={handleGoogleSignUp}
                disabled={!!socialLoading}
              >
                {socialLoading === 'google' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <FcGoogle className="h-6 w-6" />
                    {t('signup_page.continue_with_google')}
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-200 bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                onClick={handleAppleSignUp}
                disabled={!!socialLoading}
              >
                {socialLoading === 'apple' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <FaApple className="h-6 w-6" />
                    {t('signup_page.continue_with_apple')}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-6 px-8 pb-8">
            <p className="text-center text-gray-600">
              {t('signup_page.already_have_account')}{' '}
              <Link 
                to="/login" 
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-300"
              >
                {t('signup_page.sign_in')}
              </Link>
            </p>
            
            <div className="w-full text-center text-xs text-gray-500">
              {t('signup_page.terms_privacy_text', { 
                terms: <a href="/terms" className="text-blue-600 hover:underline">{t('signup_page.terms')}</a>,
                privacy: <a href="/privacy" className="text-blue-600 hover:underline">{t('signup_page.privacy')}</a>
              })}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;