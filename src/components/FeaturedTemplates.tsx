
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Sample template data for the homepage
const featuredTemplates = [
  {
    id: 'template-1',
    title: 'Meme Coin Pro',
    description: 'Perfect for launching meme coins with style',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
    category: 'Meme Coin',
  },
  {
    id: 'template-2',
    title: 'DeFi Dashboard',
    description: 'Sleek interface for DeFi applications',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
    category: 'DeFi',
  },
  {
    id: 'template-3',
    title: 'NFT Showcase',
    description: 'Highlight your NFT collections beautifully',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    category: 'NFT',
  },
];

const FeaturedTemplates = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate the featured templates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % featuredTemplates.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-background to-background opacity-40 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Featured Templates</h2>
          <p className="text-white/70 text-lg">
            Start with one of our professionally designed templates and customize it to fit your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featuredTemplates.map((template, index) => (
            <Link 
              key={template.id} 
              to={`/templates/${template.id}`}
              className={`glass-morphism rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 
                ${index === activeIndex ? 'ring-2 ring-primary/50 transform scale-[1.03]' : ''}`}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/20 text-primary">
                    {template.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-1">{template.title}</h3>
                <p className="text-white/70 text-sm">{template.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center animate-on-scroll opacity-0">
          <Link to="/templates">
            <Button className="group">
              <span>Browse All Templates</span>
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTemplates;
