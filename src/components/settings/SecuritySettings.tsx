
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SecuritySettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password Updated",
        description: "Your password has been successfully changed.",
      });
      
      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 1000);
  };

  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactor(checked);
    toast({
      title: checked ? "2FA Enabled" : "2FA Disabled",
      description: checked 
        ? "Two-factor authentication has been enabled for your account."
        : "Two-factor authentication has been disabled for your account.",
    });
  };

  const handleSessionTimeoutToggle = (checked: boolean) => {
    setSessionTimeout(checked);
    toast({
      title: checked ? "Session Timeout Enabled" : "Session Timeout Disabled",
      description: checked 
        ? "Your session will automatically expire after 1 hour of inactivity."
        : "Your session will remain active until you manually logout.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
        <p className="text-white/70 mb-6">
          Manage your account security preferences and change your password.
        </p>
      </div>

      <Card className="glass-morphism border-white/10 bg-white/5 p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="text-lg font-medium">Change Password</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="glass-morphism bg-white/5 border-white/10 mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="glass-morphism bg-white/5 border-white/10 mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="glass-morphism bg-white/5 border-white/10 mt-1"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="glass-morphism border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-medium mb-4">Security Options</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-white/60">Add an extra layer of security to your account.</p>
            </div>
            <Switch 
              checked={twoFactor} 
              onCheckedChange={handleTwoFactorToggle} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Session Timeout</h4>
              <p className="text-sm text-white/60">Automatically log out after 1 hour of inactivity.</p>
            </div>
            <Switch 
              checked={sessionTimeout} 
              onCheckedChange={handleSessionTimeoutToggle} 
            />
          </div>
        </div>
      </Card>

      <Card className="glass-morphism border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-medium mb-4 text-red-500">Danger Zone</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-white/60">Permanently delete your account and all associated data.</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="glass-morphism border-white/10 bg-background">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600">Delete Account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SecuritySettings;
