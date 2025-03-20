
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { CreditCard, AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

const BillingSettings = () => {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState('free');
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  const handleUpgrade = (planId: string) => {
    setIsUpgrading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsUpgrading(false);
      setCurrentPlan(planId);
      toast({
        title: "Plan Upgraded",
        description: `You have been upgraded to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Billing & Subscription</h2>
        <p className="text-white/70 mb-6">
          Manage your subscription plan and payment methods.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="glass-morphism border border-white/10 rounded-md p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium mb-1">Current Plan</h3>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                {currentPlan === 'free' ? 'Free Plan' : 
                 currentPlan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
              </span>
              {currentPlan !== 'free' && <Badge variant="outline" className="border-green-500 text-green-500">Active</Badge>}
            </div>
            <p className="text-sm text-white/60 mt-1">
              {currentPlan === 'free' 
                ? 'Basic features for personal projects' 
                : currentPlan === 'pro' 
                  ? 'Advanced features for professionals' 
                  : 'Complete solution for teams and businesses'}
            </p>
          </div>
          <div>
            {currentPlan === 'free' && (
              <Button 
                variant="default" 
                className="group relative overflow-hidden"
                onClick={() => handleUpgrade('pro')}
                disabled={isUpgrading}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">{isUpgrading ? "Upgrading..." : "Upgrade Plan"}</span>
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className={`border-white/10 glass-morphism hover:border-white/30 transition-all cursor-pointer ${currentPlan === 'free' ? 'ring-1 ring-primary' : ''}`}>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>
                <span className="text-xl font-bold">$0</span>
                <span className="text-white/60"> /month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">1 Project</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Basic Components</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Community Support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={currentPlan === 'free' ? 'secondary' : 'outline'} 
                className="w-full"
                disabled={currentPlan === 'free'}
              >
                {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className={`border-white/10 glass-morphism hover:border-white/30 transition-all cursor-pointer ${currentPlan === 'pro' ? 'ring-1 ring-primary' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pro</CardTitle>
                <Badge className="bg-primary">Popular</Badge>
              </div>
              <CardDescription>
                <span className="text-xl font-bold">$19</span>
                <span className="text-white/60"> /month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">10 Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Premium Components</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Priority Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Custom Domain</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={currentPlan === 'pro' ? 'secondary' : 'default'}
                className={`w-full ${currentPlan !== 'pro' ? 'group relative overflow-hidden' : ''}`}
                onClick={() => currentPlan !== 'pro' && handleUpgrade('pro')}
                disabled={currentPlan === 'pro' || isUpgrading}
              >
                {currentPlan !== 'pro' && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative">
                  {currentPlan === 'pro' 
                    ? 'Current Plan' 
                    : isUpgrading ? 'Upgrading...' : 'Upgrade'}
                </span>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className={`border-white/10 glass-morphism hover:border-white/30 transition-all cursor-pointer ${currentPlan === 'enterprise' ? 'ring-1 ring-primary' : ''}`}>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>
                <span className="text-xl font-bold">$49</span>
                <span className="text-white/60"> /month</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Unlimited Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">All Components</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Dedicated Support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm">Advanced Analytics</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={currentPlan === 'enterprise' ? 'secondary' : 'default'}
                className={`w-full ${currentPlan !== 'enterprise' ? 'group relative overflow-hidden' : ''}`}
                onClick={() => currentPlan !== 'enterprise' && handleUpgrade('enterprise')}
                disabled={currentPlan === 'enterprise' || isUpgrading}
              >
                {currentPlan !== 'enterprise' && (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <span className="relative">
                  {currentPlan === 'enterprise' 
                    ? 'Current Plan' 
                    : isUpgrading ? 'Upgrading...' : 'Upgrade'}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          
          <Card className="glass-morphism border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-full">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">No Payment Method</p>
                    <p className="text-sm text-white/60">Add a payment method to upgrade your plan</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="glass-morphism border-white/10 hover:bg-white/5">
                  Add Card
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Billing History</h3>
          
          <Card className="glass-morphism border-white/10">
            <CardContent className="p-4">
              <div className="flex flex-col items-center justify-center py-6">
                <AlertCircle className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No billing history available</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
