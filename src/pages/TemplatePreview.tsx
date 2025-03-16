
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/utils/animation';
import { ArrowLeft, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock templates data - this would be fetched from an API in production
const templates = [
  {
    id: 'moon-coin',
    name: 'Moon Coin',
    description: 'Perfect for meme coins with bold, playful design.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
    category: 'meme-coin',
    isPro: false,
    previewImages: [
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop'
    ],
    features: [
      'Animated hero section',
      'Tokenomics chart',
      'Roadmap timeline',
      'How to buy guide',
      'Community links',
      'FAQ accordion'
    ]
  },
  {
    id: 'defi-pro',
    name: 'DeFi Pro',
    description: 'Sophisticated design for DeFi protocols and platforms.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    category: 'defi',
    isPro: true,
    previewImages: [
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop'
    ],
    features: [
      'Analytics dashboard',
      'Price chart integration',
      'Staking calculator',
      'Token swap interface',
      'Documentation section',
      'Governance portal'
    ]
  },
  {
    id: 'nft-showcase',
    name: 'NFT Showcase',
    description: 'Gallery-style layout for NFT collections and marketplaces.',
    image: 'https://images.unsplash.com/photo-1634986666676-ec9e2369d83c?q=80&w=2832&auto=format&fit=crop',
    category: 'nft',
    isPro: true,
    previewImages: [
      'https://images.unsplash.com/photo-1634986666676-ec9e2369d83c?q=80&w=2832&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop'
    ],
    features: [
      'Gallery grid layout',
      'Metadata display',
      'Collection filtering',
      'Artist profiles',
      'Mint interface',
      'Marketplace integration'
    ]
  }
];

const TemplatePreview = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const template = templates.find(t => t.id === id);
  
  if (!template) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Template Not Found</h1>
            <p className="mb-8">The template you're looking for doesn't exist.</p>
            <Link to="/templates">
              <Button>
                <ArrowLeft size={16} className="mr-2" />
                Back to Templates
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === template.previewImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? template.previewImages.length - 1 : prev - 1
    );
  };
  
  const handleUseTemplate = () => {
    if (template.isPro) {
      toast({
        title: "Pro Template",
        description: "This is a Pro template. Please upgrade to access it.",
        variant: "destructive"
      });
    } else {
      // Navigate to create project with template
      window.location.href = `/dashboard/create?template=${template.id}`;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <Link to="/templates" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Templates
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">{template.name}</h1>
            <p className="text-white/70 text-lg max-w-3xl">{template.description}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 animate-fade-in animate-delay-100">
              <div className="relative rounded-xl overflow-hidden glass-morphism border border-white/10 aspect-video">
                <img 
                  src={template.previewImages[currentImageIndex]} 
                  alt={`${template.name} preview ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation arrows */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center text-white"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-colors flex items-center justify-center text-white"
                  aria-label="Next image"
                >
                  <ArrowLeft size={20} className="rotate-180" />
                </button>
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {template.previewImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
                
                {template.isPro && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary rounded text-sm font-semibold">
                    PRO
                  </div>
                )}
              </div>
              
              <div className="mt-8 glass-morphism border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Template Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-white/80">
                      <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="animate-fade-in animate-delay-200">
              <div className="glass-morphism border border-white/10 rounded-xl p-6 sticky top-28">
                <h2 className="text-xl font-semibold mb-4">Get Started</h2>
                <p className="text-white/70 mb-6">
                  Use this template to quickly create your Web3 website with professional design and all the features you need.
                </p>
                
                <Button 
                  onClick={handleUseTemplate}
                  className="w-full mb-3 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    <Copy size={16} className="mr-2" />
                    Use This Template
                  </span>
                </Button>
                
                {template.isPro && (
                  <p className="text-white/50 text-sm text-center">
                    This is a Pro template. <Link to="/pricing" className="text-primary hover:underline">Upgrade</Link> to access.
                  </p>
                )}
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="font-medium mb-3">Template Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Category:</span>
                      <span>{template.category.charAt(0).toUpperCase() + template.category.slice(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Type:</span>
                      <span>{template.isPro ? 'Premium' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Pages:</span>
                      <span>7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Components:</span>
                      <span>15+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TemplatePreview;
