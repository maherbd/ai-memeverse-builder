
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  UserCircle, 
  Bell, 
  Shield, 
  CreditCard, 
  ChevronLeft, 
  Save,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form state
  const [displayName, setDisplayName] = useState('Satoshi Nakamoto');
  const [bio, setBio] = useState('Crypto enthusiast and blockchain developer.');
  const [email, setEmail] = useState('satoshi@example.com');
  const [username, setUsername] = useState('satoshi');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [newProjectNotifications, setNewProjectNotifications] = useState(true);
  
  // Security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  
  // Payment setting
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your account settings have been updated successfully.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Header */}
        <div className="border-b border-white/10 bg-background/80 backdrop-blur-lg fixed top-16 left-0 right-0 z-40">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Dashboard
              </Button>
              <span className="text-lg font-medium">Account Settings</span>
            </div>
            
            <Button size="sm" onClick={handleSaveSettings}>
              <Save size={16} className="mr-1" />
              Save Changes
            </Button>
          </div>
        </div>
        
        <div className="container mx-auto pt-16 px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-2">
              <Tabs 
                orientation="vertical" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="flex md:flex-col w-full h-auto glass-morphism bg-background/50 border border-white/10">
                  <TabsTrigger 
                    value="profile" 
                    className="flex justify-start w-full data-[state=active]:bg-white/10"
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="flex justify-start w-full data-[state=active]:bg-white/10"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="security" 
                    className="flex justify-start w-full data-[state=active]:bg-white/10"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger 
                    value="billing" 
                    className="flex justify-start w-full data-[state=active]:bg-white/10"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your personal information and how it appears to others.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input 
                            id="displayName"
                            value={displayName} 
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="glass-morphism bg-white/5 border-white/10"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input 
                            id="username"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="glass-morphism bg-white/5 border-white/10"
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            app.reham.org/{username}
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className="glass-morphism bg-white/5 border-white/10"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-4">
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio"
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                            className="glass-morphism bg-white/5 border-white/10"
                            rows={5}
                          />
                          <p className="text-sm text-muted-foreground mt-1">
                            A brief description about yourself.
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <Label htmlFor="publicProfile">Public Profile</Label>
                          <Switch id="publicProfile" defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-medium mb-4">Connected Wallets</h3>
                      <div className="flex flex-col gap-4">
                        <div className="p-4 border border-white/10 rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                              alt="MetaMask" 
                              className="w-8 h-8 mr-3"
                            />
                            <div>
                              <p className="font-medium">MetaMask</p>
                              <p className="text-sm text-muted-foreground">0x71C...f3a2</p>
                            </div>
                          </div>
                          <Button variant="destructive" size="sm">
                            <Trash2 size={16} className="mr-1" />
                            Disconnect
                          </Button>
                        </div>
                        
                        <Button variant="outline" className="glass-morphism border-white/10 hover:bg-white/5">
                          <RefreshCw size={16} className="mr-2" />
                          Connect Another Wallet
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch 
                          id="emailNotifications" 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="marketingEmails">Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">Receive promotional emails and offers</p>
                        </div>
                        <Switch 
                          id="marketingEmails" 
                          checked={marketingEmails} 
                          onCheckedChange={setMarketingEmails}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="newProjectNotifications">New Project Updates</Label>
                          <p className="text-sm text-muted-foreground">Get notified about new templates and features</p>
                        </div>
                        <Switch 
                          id="newProjectNotifications" 
                          checked={newProjectNotifications} 
                          onCheckedChange={setNewProjectNotifications}
                        />
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-medium mb-4">Notification Channels</h3>
                      
                      <RadioGroup defaultValue="all">
                        <div className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All Channels (Email & Web)</Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email">Email Only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="web" id="web" />
                          <Label htmlFor="web">Web Only</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and authentication methods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password">Change Password</Label>
                        <div className="grid gap-2 mt-1">
                          <Input 
                            id="currentPassword" 
                            type="password" 
                            placeholder="Current Password"
                            className="glass-morphism bg-white/5 border-white/10"
                          />
                          <Input 
                            id="newPassword" 
                            type="password" 
                            placeholder="New Password"
                            className="glass-morphism bg-white/5 border-white/10"
                          />
                          <Input 
                            id="confirmPassword" 
                            type="password" 
                            placeholder="Confirm New Password"
                            className="glass-morphism bg-white/5 border-white/10"
                          />
                          <Button className="w-full md:w-auto">Update Password</Button>
                        </div>
                      </div>
                      
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Switch 
                            id="twoFactorAuth" 
                            checked={twoFactorEnabled} 
                            onCheckedChange={setTwoFactorEnabled}
                          />
                        </div>
                        
                        {twoFactorEnabled && (
                          <div className="mt-4 p-4 border border-white/10 rounded-md">
                            <p className="mb-2">Scan this QR code with your authenticator app:</p>
                            <div className="w-40 h-40 bg-white p-2 mx-auto mb-4">
                              {/* Placeholder for QR code */}
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                QR Code
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Input 
                                placeholder="Enter 6-digit code" 
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                              <Button>Verify</Button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t border-white/10 pt-4">
                        <Label htmlFor="sessionTimeout">Session Timeout</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Automatically log out after period of inactivity
                        </p>
                        <div className="flex gap-2">
                          <Input 
                            id="sessionTimeout"
                            type="number" 
                            value={sessionTimeout} 
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            min="5"
                            max="60"
                            className="w-20 glass-morphism bg-white/5 border-white/10"
                          />
                          <span className="flex items-center">minutes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-medium text-red-500 mb-4">Danger Zone</h3>
                      <div className="space-y-4">
                        <Button variant="destructive" className="w-full md:w-auto">
                          <Trash2 size={16} className="mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="billing" className="mt-0">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardHeader>
                    <CardTitle>Billing and Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan and payment methods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 border border-white/10 rounded-md bg-white/5">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-lg">Free Plan</h3>
                          <p className="text-sm text-muted-foreground">Basic access to templates and features</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">$0 / month</p>
                          <Button variant="outline" className="mt-2 glass-morphism border-white/10 hover:bg-white/5">
                            Upgrade
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-medium mb-4">Payment Method</h3>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2 p-4 border border-white/10 rounded-md">
                            <RadioGroupItem value="card" id="payment-card" />
                            <Label htmlFor="payment-card" className="flex-grow">Credit / Debit Card</Label>
                            <div className="flex space-x-1">
                              <div className="w-8 h-5 bg-blue-600 rounded"></div>
                              <div className="w-8 h-5 bg-orange-600 rounded"></div>
                              <div className="w-8 h-5 bg-red-600 rounded"></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 p-4 border border-white/10 rounded-md">
                            <RadioGroupItem value="crypto" id="payment-crypto" />
                            <Label htmlFor="payment-crypto" className="flex-grow">Cryptocurrency</Label>
                            <div className="flex space-x-1">
                              <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                              <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                      
                      {paymentMethod === 'card' && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber" 
                              placeholder="1234 5678 9012 3456"
                              className="glass-morphism bg-white/5 border-white/10"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/YY"
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input 
                                id="cvc" 
                                placeholder="123"
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                            </div>
                          </div>
                          
                          <Button>Save Card</Button>
                        </div>
                      )}
                      
                      {paymentMethod === 'crypto' && (
                        <div className="mt-4">
                          <div className="p-4 border border-white/10 rounded-md">
                            <p className="mb-2">Send payment to the following address:</p>
                            <div className="bg-white/5 p-3 rounded-md font-mono text-sm break-all mb-4">
                              0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Supports ETH, USDT, USDC on Ethereum network
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-medium mb-4">Billing History</h3>
                      <div className="text-sm text-muted-foreground">
                        No billing history available for free plan.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
