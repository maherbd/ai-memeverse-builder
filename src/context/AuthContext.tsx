
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  displayName: string;
  email: string;
  walletAddress?: string;
  avatar?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulate checking for a stored session
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual authentication logic
      console.log('Logging in with:', email, password);
      
      // Simulate successful login
      const mockUser: User = {
        id: '1',
        displayName: 'Satoshi Nakamoto',
        email: email,
        role: 'user',
      };
      
      // Store user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };
  
  const connectWallet = (address: string, type: string) => {
    if (user) {
      const updatedUser = { ...user, walletAddress: address };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${type} wallet.`,
      });
    } else {
      // Create a new user with just the wallet
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 11),
        displayName: `User ${Math.floor(Math.random() * 1000)}`,
        email: '',
        walletAddress: address,
        role: 'user',
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${type} wallet.`,
      });
    }
  };
  
  const disconnectWallet = () => {
    if (user) {
      const { walletAddress, ...userData } = user;
      setUser(userData as User);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    }
  };
  
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    connectWallet,
    disconnectWallet,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
