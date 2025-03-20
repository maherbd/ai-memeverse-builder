
import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Mail, MessageSquare } from "lucide-react";

const NotificationsSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    securityAlerts: true,
    newFeatures: true,
    projectUpdates: true,
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
        <p className="text-white/70 mb-6">
          Control which notifications you receive and how you receive them.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Delivery Methods</h3>
          
          <Card className="glass-morphism border-white/10">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-white/60">Receive notifications via email</p>
                  </div>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={() => handleToggle('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <Label htmlFor="pushNotifications" className="font-medium">Push Notifications</Label>
                    <p className="text-sm text-white/60">Receive push notifications in-browser</p>
                  </div>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={() => handleToggle('pushNotifications')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Types</h3>
          
          <Card className="glass-morphism border-white/10">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="securityAlerts" className="font-medium">Security Alerts</Label>
                  <p className="text-sm text-white/60">Important security updates and alerts</p>
                </div>
                <Switch
                  id="securityAlerts"
                  checked={settings.securityAlerts}
                  onCheckedChange={() => handleToggle('securityAlerts')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newFeatures" className="font-medium">New Features</Label>
                  <p className="text-sm text-white/60">Updates about new platform features</p>
                </div>
                <Switch
                  id="newFeatures"
                  checked={settings.newFeatures}
                  onCheckedChange={() => handleToggle('newFeatures')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="projectUpdates" className="font-medium">Project Updates</Label>
                  <p className="text-sm text-white/60">Updates and analytics about your projects</p>
                </div>
                <Switch
                  id="projectUpdates"
                  checked={settings.projectUpdates}
                  onCheckedChange={() => handleToggle('projectUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails" className="font-medium">Marketing Emails</Label>
                  <p className="text-sm text-white/60">Promotional content and newsletters</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={settings.marketingEmails}
                  onCheckedChange={() => handleToggle('marketingEmails')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="group relative overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">{isSaving ? "Saving..." : "Save Changes"}</span>
        </Button>
      </div>
    </div>
  );
};

export default NotificationsSettings;
