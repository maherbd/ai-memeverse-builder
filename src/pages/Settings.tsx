
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from '@/components/settings/ProfileSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import BillingSettings from '@/components/settings/BillingSettings';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

const Settings = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // State
  const [activeTab, setActiveTab] = useState('profile');
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-fade-in">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Account Settings</h1>
                <p className="text-white/70 text-lg">
                  Manage your profile, security, and application preferences
                </p>
              </div>
              
              <Link to="/wallet">
                <Button variant="outline" className="glass-morphism border-white/10 hover:bg-white/5">
                  <Wallet size={16} className="mr-2" />
                  Wallet Settings
                </Button>
              </Link>
            </div>
            
            <div className="glass-morphism border border-white/10 rounded-lg overflow-hidden animate-fade-in animate-delay-100">
              <Tabs 
                defaultValue={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full justify-start p-2 bg-background/50 border-b border-white/10">
                  <TabsTrigger value="profile" className="px-6">Profile</TabsTrigger>
                  <TabsTrigger value="security" className="px-6">Security</TabsTrigger>
                  <TabsTrigger value="notifications" className="px-6">Notifications</TabsTrigger>
                  <TabsTrigger value="billing" className="px-6">Billing</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  <TabsContent value="profile" className="mt-0">
                    <ProfileSettings />
                  </TabsContent>
                  
                  <TabsContent value="security" className="mt-0">
                    <SecuritySettings />
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="mt-0">
                    <NotificationsSettings />
                  </TabsContent>
                  
                  <TabsContent value="billing" className="mt-0">
                    <BillingSettings />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
