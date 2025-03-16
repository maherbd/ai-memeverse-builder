
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToContent = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid z-0"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="container mx-auto max-w-5xl z-10 pt-16 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full glass-morphism border border-white/10 animate-fade-in">
          <p className="text-sm text-white/80">
            AI-Powered Web3 Websites for your Meme Coins
          </p>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight md:leading-tight lg:leading-tight animate-fade-in animate-delay-100">
          <span className="text-gradient">Create Professional</span>
          <br />
          <span className="text-gradient-primary">Web3 Websites</span>
          <br />
          <span className="text-gradient">in Minutes</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 animate-fade-in animate-delay-200">
          Harness the power of AI to build stunning blockchain-ready websites 
          for your projects with multi-chain support for Ethereum and Solana.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
          <Link to="/templates">
            <Button size="lg" className="group relative overflow-hidden">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center">
                Get Started
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="glass-morphism border-white/10 hover:bg-white/5"
            onClick={scrollToContent}
          >
            <span className="flex items-center">
              Learn More
              <ArrowDown size={16} className="ml-2" />
            </span>
          </Button>
        </div>
      </div>
      
      {/* Mock Website Display */}
      <div className="w-full max-w-4xl mx-auto mt-16 md:mt-20 animate-fade-in animate-delay-500">
        <div className="relative w-full aspect-video bg-gradient-to-b from-background to-background/50 rounded-lg glass-morphism overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 glass-morphism px-3 py-0.5 rounded-full text-xs">app.reham.org/demo</div>
          </div>
          
          <div className="pt-10 px-4 pb-4 w-full h-full">
            <div className="w-full h-full bg-dots rounded-md overflow-hidden relative">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="text-2xl font-bold text-gradient-primary">MOON COIN</h3>
                <p className="text-white/60 text-sm">The next generation meme token</p>
              </div>
              
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 h-32 glass-morphism rounded-lg border border-white/10 flex items-center justify-center">
                <div className="w-1/2 h-16 border-r border-white/10 flex items-center justify-center">
                  <div>
                    <p className="text-xs text-white/60">Current Price</p>
                    <p className="text-lg font-bold text-white">$0.00042</p>
                  </div>
                </div>
                <div className="w-1/2 h-16 flex items-center justify-center">
                  <div>
                    <p className="text-xs text-white/60">Market Cap</p>
                    <p className="text-lg font-bold text-white">$2.1M</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 right-6 w-24 h-24 glass-morphism rounded-full flex items-center justify-center p-5 animate-float">
                <div className="w-full h-full rounded-full bg-blue-500/30 flex items-center justify-center text-3xl font-bold">🚀</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60">
        <ArrowDown size={20} />
      </div>
    </div>
  );
};

export default Hero;
