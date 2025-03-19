
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import WalletConnect from '@/components/WalletConnect';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setActiveTab('login');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <Card className="glass-morphism border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-center">
                {showForgotPassword 
                  ? 'Forgot Password' 
                  : activeTab === 'login' 
                    ? 'Sign In' 
                    : 'Create Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {showForgotPassword 
                  ? 'Reset your password to regain access to your account' 
                  : activeTab === 'login' 
                    ? 'Sign in to your account to access your projects' 
                    : 'Create a new account to get started with Reham'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showForgotPassword ? (
                <div className="space-y-4">
                  <ForgotPasswordForm />
                  <button 
                    className="text-sm text-primary hover:underline block mx-auto mt-4"
                    onClick={handleBackToLogin}
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-2 w-full glass-morphism bg-background/50 border border-white/10">
                    <TabsTrigger value="login" className="data-[state=active]:bg-white/10">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="data-[state=active]:bg-white/10">
                      Register
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <LoginForm />
                    <button 
                      className="text-sm text-primary hover:underline block mx-auto mt-4"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot your password?
                    </button>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <RegisterForm />
                  </TabsContent>
                </Tabs>
              )}
              
              {!showForgotPassword && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  
                  <WalletConnect isMobile={false} />
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              {!showForgotPassword && (
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'login' 
                    ? "Don't have an account? " 
                    : "Already have an account? "}
                  <button 
                    className="text-primary hover:underline"
                    onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  >
                    {activeTab === 'login' ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
