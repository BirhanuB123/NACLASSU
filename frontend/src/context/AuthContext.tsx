
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
          // Use relative URL to go through Vite proxy (avoids CORS issues)
          // Vite proxy: /api -> http://localhost:5000/api
          // So /api/auth/me becomes http://localhost:5000/api/auth/me
          // Always use relative URL in development to avoid CORS and double /api paths
          const apiUrl = '/api/auth/me';
          
          console.log('[AuthContext] Fetching user from:', apiUrl);
          
          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            const backendUser = data.data;
            
            if (!backendUser) {
              console.error('No user data in response:', data);
              throw new Error('No user data received from backend');
            }
            
            // Map backend user to our custom User type with the actual role from MongoDB
            const user: User = {
              id: backendUser.id || backendUser._id,
              email: backendUser.email,
              first_name: backendUser.fullName?.split(' ')[0] || null,
              last_name: backendUser.fullName?.split(' ').slice(1).join(' ') || null,
              role: backendUser.role || 'user'
            };
            
            setUser(user);
            
            // Set admin status based on the actual role from MongoDB
            // Check both lowercase and original case for role
            const userRole = (backendUser.role || 'user').toLowerCase().trim();
            const isAdminUser = userRole === 'admin';
            
            console.log('Auth State Changed:', {
              email: backendUser.email,
              role: backendUser.role,
              roleLowercase: userRole,
              isAdmin: isAdminUser,
              fullBackendData: backendUser,
              fullResponse: data,
              timestamp: new Date().toISOString()
            });
            
            setIsAdmin(isAdminUser);
          } else {
            // If backend call fails, log the error and fall back
            const errorText = await response.text();
            console.error('Failed to fetch user from backend:', {
              status: response.status,
              statusText: response.statusText,
              error: errorText
            });
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
