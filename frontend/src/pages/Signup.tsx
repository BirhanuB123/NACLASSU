import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

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
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState('');
  const navigate = useNavigate();
  
  const backgroundStyle = {
    backgroundImage: 'url("/lovable-uploads/5da4f0f9-ca7d-466d-a037-8073cbd0e04b.png")',
    filter: 'brightness(0.6)'
  };
  
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
      setPasswordError(t('Passwords do not match'));
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
        title: t('Sign up successful'),
        description: (
          <div>
            <p>{t('A verification email has been sent to')} {email}.</p>
            <p className="mt-2">{t('Please verify your email before logging in.')}</p>
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
      
      const errorMessage = error.response?.data?.message || error.message || t('Sign up error');
      toast({
        title: t('Sign up failed'),
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
        title: t('Sign up successful'),
        description: t('Account created successfully'),
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
      
      const errorMessage = error.response?.data?.message || error.message || t('Google sign up failed');
      toast({
        title: t('Sign up failed'),
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
        title: t('Sign up successful'),
        description: t('Account created'),
      });

      // Redirect to home for social login since they're already authenticated
      navigate('/');
    } catch (error: any) {
      console.error('Apple sign up error:', error);
      toast({
        title: t('Sign up failed'),
        description: error.message || t('Sign up error'),
        variant: "destructive",
      });
    } finally {
      setSocialLoading('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={backgroundStyle}
      />
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="w-full max-w-lg mx-4 z-20">
        <Card className="border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-serif font-bold text-gray-900">
              {t('Create your account')}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {t('Join our community today')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4" onSubmit={handleSignUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-sm font-medium text-gray-700">
                    {t('First Name')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="first-name"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-sm font-medium text-gray-700">
                    {t('Last Name')} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="last-name"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  {t('Email address')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('Password')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${passwordError ? 'border-red-300' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                  {t('Confirm Password')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className={`w-full px-4 py-3 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 ${passwordError ? 'border-red-300' : ''}`}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (passwordError) setPasswordError('');
                  }}
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                )}
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
                      {t('Creating Account...')}
                    </>
                  ) : (
                    t('Sign up')
                  )}
                </Button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {t('Or continue with')}
                </span>
              </div>
            </div>

            <div className="px-8 space-y-4">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-3 py-6 text-base"
                onClick={handleGoogleSignUp}
                disabled={!!socialLoading}
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
                onClick={handleAppleSignUp}
                disabled={!!socialLoading}
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-center text-gray-600">
              {t('Already have an account?')}{' '}
              <Link 
                to="/login" 
                className="font-medium text-primary-600 hover:text-primary-500 hover:underline"
              >
                {t('Sign in')}
              </Link>
            </p>
            
            <div className="w-full text-center text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <a href="/terms" className="text-primary-600 hover:underline">Terms</a> and{' '}
              <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Add these styles to your global CSS or in a separate stylesheet
const styles = `
  .card-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .card-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
`;

// Add the styles to the document head if they don't already exist
if (!document.querySelector('style[data-signup-styles]')) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('data-signup-styles', 'true');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default SignUpPage;