
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/config/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  signOut: async () => {},
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Map Firebase user to our custom User type
        const user: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          first_name: firebaseUser.displayName?.split(' ')[0] || null,
          last_name: firebaseUser.displayName?.split(' ').slice(1).join(' ') || null,
          role: 'user' // Default role, you might want to fetch this from your database
        };
        
        setUser(user);
        
        // Check for admin access based on email (case-insensitive)
        const adminEmails = [
          'admin@nassu.org',
          'admin@example.com' // Remove this in production
        ].map(email => email.toLowerCase());
        
        const userEmail = firebaseUser.email?.toLowerCase() || '';
        const isAdminUser = userEmail ? 
          adminEmails.includes(userEmail) || 
          userEmail.endsWith('@nassu.org') : false;
          
        console.log('Admin check:', {
          email: userEmail,
          isAdmin: isAdminUser,
          timestamp: new Date().toISOString()
        });
        
        console.log('Auth State Changed:', {
          email: firebaseUser.email,
          isAdmin: isAdminUser,
          timestamp: new Date().toISOString()
        });
        setIsAdmin(isAdminUser);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Signed out successfully",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    setUser,
    loading,
    signOut,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
