
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Check, Copy, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const WalletSettings = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // State
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { toast } = useToast();
  const { user, connectWallet, disconnectWallet } = useAuth();
  const isConnected = !!user?.walletAddress;
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyAddress = () => {
    if (!user?.walletAddress) return;
    navigator.clipboard.writeText(user.walletAddress);
    setCopiedAddress(true);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
    
    setTimeout(() => setCopiedAddress(false), 2000);
  };
  
  const handleDisconnect = () => {
    disconnectWallet();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected from your account",
    });
  };

  const truncateAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 16)}...${address.slice(-8)}`;
  };

  const handleViewOnExplorer = () => {
    if (!user?.walletAddress) return;
    
    // Default to Ethereum explorer
    const explorerUrl = `https://etherscan.io/address/${user.walletAddress}`;
    window.open(explorerUrl, '_blank');
    
    toast({
      title: "Opening Explorer",
      description: "Viewing wallet on blockchain explorer",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Wallet Management</h1>
              <p className="text-white/70 text-lg">
                Connect and manage your crypto wallets
              </p>
            </div>
            
            <div className="space-y-6">
              <Card className="glass-morphism border-white/10 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Wallet className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Your Wallet</h2>
                        {isConnected ? (
                          <div className="flex items-center text-white/70">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></div>
                            <span>{truncateAddress(user?.walletAddress)}</span>
                          </div>
                        ) : (
                          <p className="text-white/70">No wallet connected</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {isConnected ? (
                        <>
                          <Button variant="outline" size="sm" onClick={handleCopyAddress}>
                            {copiedAddress ? <Check size={16} /> : <Copy size={16} />}
                            <span className="ml-1">Copy Address</span>
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleViewOnExplorer}>
                            <ExternalLink size={16} />
                            <span className="ml-1">View on Explorer</span>
                          </Button>
                          <Button variant="destructive" size="sm" onClick={handleDisconnect}>
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <div className="w-full sm:w-auto">
                          <Button className="w-full">
                            <Wallet size={16} className="mr-2" />
                            Connect Wallet
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-morphism border-white/10 overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Transaction History</h2>
                  {isConnected ? (
                    <div className="space-y-4">
                      <div className="text-center py-8 text-white/70">
                        <p>No transactions found</p>
                        <p className="text-sm mt-2">Transactions will appear here once you make or receive payments</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-white/70">
                      <p>Connect your wallet to see transaction history</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WalletSettings;
