
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
        try {
          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
          
          // Fetch user profile from backend to get the actual role from MongoDB
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            const backendUser = data.data;
            
            // Map backend user to our custom User type with the actual role from MongoDB
            const user: User = {
              id: backendUser.id,
              email: backendUser.email,
              first_name: backendUser.fullName?.split(' ')[0] || null,
              last_name: backendUser.fullName?.split(' ').slice(1).join(' ') || null,
              role: backendUser.role || 'user'
            };
            
            setUser(user);
            
            // Set admin status based on the actual role from MongoDB
            const isAdminUser = backendUser.role === 'admin';
            
            console.log('Auth State Changed:', {
              email: backendUser.email,
              role: backendUser.role,
              isAdmin: isAdminUser,
              timestamp: new Date().toISOString()
            });
            
            setIsAdmin(isAdminUser);
          } else {
            // If backend call fails, fall back to email-based check and create basic user
            console.warn('Failed to fetch user from backend, using fallback auth');
            
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              first_name: firebaseUser.displayName?.split(' ')[0] || null,
              last_name: firebaseUser.displayName?.split(' ').slice(1).join(' ') || null,
              role: 'user'
            };
            
            setUser(user);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          
          // Fall back to basic user info if backend is unavailable
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            first_name: firebaseUser.displayName?.split(' ')[0] || null,
            last_name: firebaseUser.displayName?.split(' ').slice(1).join(' ') || null,
            role: 'user'
          };
          
          setUser(user);
          setIsAdmin(false);
        }
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
