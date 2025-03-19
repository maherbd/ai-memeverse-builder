
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import WalletConnect from "@/components/WalletConnect";

const LoginForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors for the field being changed
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful login
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      
      // In a real app, you'd redirect to dashboard here
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <Card className="glass-morphism border-white/10 bg-background/20 w-full max-w-md mx-auto animate-fade-in">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        <Tabs 
          defaultValue={loginMethod} 
          onValueChange={setLoginMethod}
          className="w-full mb-6"
        >
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`glass-morphism bg-white/5 border-white/10 ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/auth?mode=forgot-password" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`glass-morphism bg-white/5 border-white/10 ${errors.password ? 'border-red-500' : ''}`}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full group relative overflow-hidden mt-2"
                disabled={isLoading}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  {isLoading ? "Signing in..." : "Sign In"}
                </span>
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="wallet">
            <div className="text-center mb-6">
              <p className="text-white/70 mb-4">
                Connect your wallet to sign in securely without a password.
              </p>
              <WalletConnect buttonText="Connect Wallet to Sign In" fullWidth />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <p className="text-white/70">
            Don't have an account?{" "}
            <Link to="/auth?mode=register" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
