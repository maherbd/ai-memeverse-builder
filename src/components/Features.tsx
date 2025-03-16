
import { Wallet, Coins, Wand, Globe, BarChart, Users, Gift } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureProps) => {
  return (
    <div 
      className={`glass-morphism p-6 rounded-xl border border-white/10 hover:border-primary/40 transition-all duration-300 animate-on-scroll opacity-0`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center mb-5 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Wallet size={24} />,
      title: 'Web3 Authentication',
      description: 'Connect with MetaMask, Phantom, or WalletConnect for secure decentralized login.',
    },
    {
      icon: <Coins size={24} />,
      title: 'Multi-Chain Support',
      description: 'Built for Ethereum and Solana with native USDC payment processing.',
    },
    {
      icon: <Wand size={24} />,
      title: 'AI-Powered Builder',
      description: 'Create professional websites in minutes with our intelligent builder.',
    },
    {
      icon: <Globe size={24} />,
      title: 'Custom Domains',
      description: 'Use our free subdomains or connect your own custom domain (PRO plan).',
    },
    {
      icon: <BarChart size={24} />,
      title: 'Web3 Content Blocks',
      description: 'Add token charts, price tickers, roadmaps, and "How to Buy" guides.',
    },
    {
      icon: <Users size={24} />,
      title: 'User Dashboard',
      description: 'Manage your websites, customize layouts, and track performance.',
    },
    {
      icon: <Gift size={24} />,
      title: 'Referral Rewards',
      description: 'Earn 10% commission for referrals and give 10% discount to referred users.',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Powerful Features</h2>
          <p className="text-white/70 text-lg">
            Everything you need to create and launch your Web3 project website, powered by cutting-edge technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              delay={100 + (index * 100)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
