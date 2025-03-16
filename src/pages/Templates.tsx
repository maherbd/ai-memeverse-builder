
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const Templates = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Template data
  const templates = [
    {
      id: 'moon-coin',
      name: 'Moon Coin',
      description: 'Perfect for meme coins with bold, playful design.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
      category: 'meme-coin',
      isPro: false,
    },
    {
      id: 'defi-pro',
      name: 'DeFi Pro',
      description: 'Sophisticated design for DeFi protocols and platforms.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
      category: 'defi',
      isPro: true,
    },
    {
      id: 'nft-showcase',
      name: 'NFT Showcase',
      description: 'Gallery-style layout for NFT collections and marketplaces.',
      image: 'https://images.unsplash.com/photo-1634986666676-ec9e2369d83c?q=80&w=2832&auto=format&fit=crop',
      category: 'nft',
      isPro: true,
    },
    {
      id: 'crypto-minimal',
      name: 'Crypto Minimal',
      description: 'Clean, minimalist design for any cryptocurrency project.',
      image: 'https://images.unsplash.com/photo-1625217527288-4b9bdf85c7af?q=80&w=2842&auto=format&fit=crop',
      category: 'crypto',
      isPro: false,
    },
    {
      id: 'token-launch',
      name: 'Token Launch',
      description: 'Optimized for ICOs and token launches with countdown features.',
      image: 'https://images.unsplash.com/photo-1639815188546-c43c240e8335?q=80&w=2832&auto=format&fit=crop',
      category: 'token-sale',
      isPro: true,
    },
    {
      id: 'web3-startup',
      name: 'Web3 Startup',
      description: 'Modern design for Web3 startups and blockchain projects.',
      image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
      category: 'startup',
      isPro: false,
    },
  ];
  
  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'meme-coin', name: 'Meme Coins' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFT' },
    { id: 'crypto', name: 'Crypto' },
    { id: 'token-sale', name: 'Token Sales' },
    { id: 'startup', name: 'Startup' },
  ];
  
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = filter === 'all' || template.category === filter;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Website Templates</h1>
            <p className="text-white/70 text-lg">
              Choose from our professionally designed templates to jumpstart your Web3 website
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12 animate-fade-in animate-delay-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              {/* Search */}
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-white/50" />
                </div>
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="pl-10 pr-4 py-2 w-full glass-morphism rounded-lg border border-white/10 bg-transparent text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="overflow-x-auto scrollbar-none pb-2 w-full md:w-auto">
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={filter === category.id ? "default" : "outline"}
                      size="sm"
                      className={
                        filter === category.id
                          ? "min-w-max"
                          : "min-w-max glass-morphism border-white/10 hover:bg-white/5"
                      }
                      onClick={() => setFilter(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in animate-delay-300">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                description={template.description}
                image={template.image}
                category={template.category}
                isPro={template.isPro}
              />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12 glass-morphism rounded-xl border border-white/10 animate-fade-in">
              <p className="text-white/70 mb-4">No templates found matching your criteria.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="glass-morphism border-white/10 hover:bg-white/5"
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
