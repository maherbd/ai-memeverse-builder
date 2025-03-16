
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow overflow-hidden">
        <Hero />
        <Features />
        
        {/* Steps Section */}
        <section className="py-24 relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-background to-transparent z-10"></div>
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">How It Works</h2>
              <p className="text-white/70 text-lg">
                Create and launch your Web3 website in three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  number: "01",
                  title: "Connect Your Wallet",
                  description: "Securely authenticate with your MetaMask, Phantom, or WalletConnect wallet.",
                  delay: 100
                },
                {
                  number: "02",
                  title: "Create Your Website",
                  description: "Choose a template and customize it to fit your meme coin's brand and vision.",
                  delay: 200
                },
                {
                  number: "03",
                  title: "Publish & Share",
                  description: "Deploy your website instantly and share it with your community.",
                  delay: 300
                }
              ].map((step, index) => (
                <div 
                  key={index} 
                  className="animate-on-scroll opacity-0 relative"
                  style={{ animationDelay: `${step.delay}ms` }}
                >
                  <div className="p-8 glass-morphism rounded-xl border border-white/10 h-full">
                    <div className="w-10 h-10 rounded-full glass-morphism border border-white/10 flex items-center justify-center text-primary font-semibold mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 -z-10">
                      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.5303 6.53033C39.8232 6.23744 39.8232 5.76256 39.5303 5.46967L34.7574 0.696699C34.4645 0.403806 33.9896 0.403806 33.6967 0.696699C33.4038 0.989593 33.4038 1.46447 33.6967 1.75736L37.9393 6L33.6967 10.2426C33.4038 10.5355 33.4038 11.0104 33.6967 11.3033C33.9896 11.5962 34.4645 11.5962 34.7574 11.3033L39.5303 6.53033ZM0 6.75H39V5.25H0V6.75Z" fill="rgba(255,255,255,0.3)"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16 animate-on-scroll opacity-0">
              <Link to="/templates">
                <Button size="lg" className="group relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Get Started Today</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-dots opacity-30 z-0"></div>
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-4xl mx-auto glass-morphism rounded-2xl p-8 md:p-12 border border-white/10 overflow-hidden">
              <div className="absolute top-0 -right-4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 -left-4 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient text-center">
                  Ready to Launch Your Web3 Project?
                </h2>
                <p className="text-white/70 text-lg text-center mb-8 max-w-2xl mx-auto">
                  Join hundreds of meme coin projects already using our platform to create professional websites in minutes.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/templates">
                    <Button size="lg" className="group relative overflow-hidden">
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative">Browse Templates</span>
                    </Button>
                  </Link>
                  
                  <Link to="/pricing">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="glass-morphism border-white/10 hover:bg-white/5"
                    >
                      <span>View Pricing</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
