import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface UserWithWallet extends User {
  walletAddress?: string;
}

interface AuthContextType {
  user: UserWithWallet | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  connectWallet: (address: string, type: string) => void;
  disconnectWallet: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { toast } = useToast();
  const [user, setUser] = useState<UserWithWallet | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount and set up auth state listener
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Sync session state
        setSession(currentSession);
        setUser(currentSession?.user as UserWithWallet || null);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in",
            description: "You have successfully signed in.",
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out",
            description: "You have been signed out.",
          });
        }
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user as UserWithWallet || null);
      setIsLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Unable to create your account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: "Logout Failed",
        description: "Unable to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const connectWallet = (address: string, type: string) => {
    if (user) {
      // In a real app, this would be stored in the user's profile in the database
      const updatedUser = { ...user, walletAddress: address };
      setUser(updatedUser);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${type} wallet.`,
      });
    } else {
      // Mock the signed out user with just a wallet
      const mockUser = {
        id: Math.random().toString(36).substring(2, 11),
        walletAddress: address,
      } as UserWithWallet;
      
      setUser(mockUser);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${type} wallet.`,
      });
    }
  };
  
  const disconnectWallet = () => {
    if (user) {
      // Remove the walletAddress but keep the user
      const { walletAddress, ...userData } = user;
      setUser(userData as UserWithWallet);
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    }
  };
  
  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    login,
    register,
    logout,
    connectWallet,
    disconnectWallet,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
