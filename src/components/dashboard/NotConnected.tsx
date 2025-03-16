
import { Button } from '@/components/ui/button';

const NotConnected = () => {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center glass-morphism rounded-xl border border-white/10 p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gradient">Connect Your Wallet</h2>
      <p className="text-white/70 text-center max-w-md mb-6">
        Please connect your wallet to access the dashboard and manage your websites.
      </p>
      <Button size="lg" className="group relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative flex items-center">
          Connect Wallet
        </span>
      </Button>
    </div>
  );
};

export default NotConnected;
