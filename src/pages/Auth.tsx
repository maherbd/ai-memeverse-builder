
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { useAuth } from '@/context/AuthContext';
import { useScrollAnimation } from '@/utils/animation';

const Auth = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-mesh-gradient">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Reham
          </h1>
          <p className="text-white/70 mt-2">
            Web3 Website Builder
          </p>
        </div>
        
        {showForgotPassword ? (
          <Card className="glass-morphism border-white/10 p-6 animate-fade-in">
            <div className="mb-4">
              <button 
                onClick={() => setShowForgotPassword(false)} 
                className="text-sm text-white/70 hover:text-primary transition-colors"
              >
                ← Back to login
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <ForgotPasswordForm />
          </Card>
        ) : (
          <Card className="glass-morphism border-white/10 p-6 animate-fade-in">
            <Tabs 
              defaultValue={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </Card>
        )}
        
        <div className="text-center mt-8 text-sm text-white/50">
          <div className="flex justify-center space-x-4">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/support" className="hover:text-primary transition-colors">Support</a>
            <a href="/documentation" className="hover:text-primary transition-colors">Docs</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
