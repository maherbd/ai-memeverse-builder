
import { useState, useCallback } from 'react';
import { Wallet, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';

interface WalletConnectProps {
  isMobile?: boolean;
  buttonText?: string;
  fullWidth?: boolean;
}

const WalletConnect = ({ 
  isMobile = false, 
  buttonText = "Connect", 
  fullWidth = false 
}: WalletConnectProps) => {
  const { user, connectWallet, disconnectWallet } = useAuth();
  const isConnected = !!user?.walletAddress;
  const [open, setOpen] = useState(false);
  
  const handleConnectWallet = useCallback((type: string) => {
    // This would be replaced with actual wallet connection logic
    console.log(`Connecting to ${type} wallet`);
    const mockAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
    connectWallet(mockAddress, type);
    setOpen(false);
  }, [connectWallet]);
  
  const handleDisconnectWallet = useCallback(() => {
    disconnectWallet();
    setOpen(false);
  }, [disconnectWallet]);
  
  const truncateAddress = (address: string | undefined) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  if (!isConnected) {
    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            className={`${isMobile || fullWidth ? 'w-full' : ''} group relative overflow-hidden`}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center">
              <Wallet size={16} className="mr-2" />
              {buttonText}
              <ChevronDown size={16} className="ml-2" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] glass-morphism border-white/10">
          <DropdownMenuItem onClick={() => handleConnectWallet('MetaMask')} className="cursor-pointer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask" 
              className="w-5 h-5 mr-2"
            />
            MetaMask
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleConnectWallet('Phantom')} className="cursor-pointer">
            <img 
              src="https://cryptologos.cc/logos/phantom-phntm-logo.png" 
              alt="Phantom" 
              className="w-5 h-5 mr-2" 
            />
            Phantom
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleConnectWallet('WalletConnect')} className="cursor-pointer">
            <img 
              src="https://avatars.githubusercontent.com/u/37784886" 
              alt="WalletConnect" 
              className="w-5 h-5 mr-2" 
            />
            WalletConnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`${isMobile || fullWidth ? 'w-full' : ''} glass-morphism border-white/10 hover:bg-white/5`}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></div>
            {truncateAddress(user?.walletAddress)}
            <ChevronDown size={16} className="ml-2" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] glass-morphism border-white/10">
        <DropdownMenuItem onClick={handleDisconnectWallet} className="cursor-pointer text-destructive">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnect;
