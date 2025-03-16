
import { useState } from 'react';
import { Wallet, ChevronDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WalletConnectProps {
  isMobile?: boolean;
}

const WalletConnect = ({ isMobile = false }: WalletConnectProps) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  
  const connectWallet = (type: string) => {
    // This would be replaced with actual wallet connection logic
    console.log(`Connecting to ${type} wallet`);
    setWalletAddress('0x71C...f3a2');
    setConnected(true);
  };
  
  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress('');
  };
  
  const truncateAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  if (!connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="default" 
            className={`${isMobile ? 'w-full' : ''} group relative overflow-hidden`}
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center">
              <Wallet size={16} className="mr-2" />
              Connect
              <ChevronDown size={16} className="ml-2" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] glass-morphism border-white/10">
          <DropdownMenuItem onClick={() => connectWallet('MetaMask')} className="cursor-pointer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
              alt="MetaMask" 
              className="w-5 h-5 mr-2"
            />
            MetaMask
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => connectWallet('Phantom')} className="cursor-pointer">
            <img 
              src="https://cryptologos.cc/logos/phantom-phntm-logo.png" 
              alt="Phantom" 
              className="w-5 h-5 mr-2" 
            />
            Phantom
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => connectWallet('WalletConnect')} className="cursor-pointer">
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`${isMobile ? 'w-full' : ''} glass-morphism border-white/10 hover:bg-white/5`}
        >
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-slow"></div>
            {truncateAddress(walletAddress)}
            <ChevronDown size={16} className="ml-2" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] glass-morphism border-white/10">
        <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer text-destructive">
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnect;
