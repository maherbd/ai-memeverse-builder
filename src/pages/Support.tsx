
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LifeBuoy,
  BookOpen,
  Mail,
  MessageCircle,
  FileText,
  ChevronRight,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  // Initialize scroll animations
  useScrollAnimation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
      // In a real application, this would route to search results
      setSearchQuery('');
    }
  };

  const faqs = [
    {
      question: "How do I connect my wallet?",
      answer: "Click the 'Connect Wallet' button in the top-right corner of the navigation bar. You can choose from MetaMask, Phantom, WalletConnect, or other supported wallets."
    },
    {
      question: "Can I use a custom domain for my website?",
      answer: "Yes! The PRO plan allows you to connect your own custom domain. Go to your project dashboard, click on the domain settings, and follow the instructions to set up your custom domain."
    },
    {
      question: "What chains are supported?",
      answer: "We currently support Ethereum, Solana, and all EVM-compatible chains like Polygon, BSC, Arbitrum, and Optimism."
    },
    {
      question: "How do I earn referral rewards?",
      answer: "Share your unique referral link with friends. When they sign up and purchase a plan, you'll earn 10% commission, and they'll get 10% off their subscription."
    },
    {
      question: "Can I export my website code?",
      answer: "Yes, PRO users can export their entire website codebase for self-hosting or further customization."
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Support Center</h1>
            <p className="text-white/70 text-lg">
              Get help with any aspect of creating and managing your Web3 website
            </p>
          </div>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12 animate-fade-in animate-delay-100">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search for help..."
                className="glass-morphism bg-white/5 border border-white/10 pl-12 py-6 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
              <Button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size="sm"
              >
                Search
              </Button>
            </form>
          </div>
          
          {/* Support Options */}
          <Tabs defaultValue="faq" className="max-w-5xl mx-auto mb-16 animate-fade-in animate-delay-200">
            <TabsList className="w-full glass-morphism bg-background/50 border border-white/10 mb-8">
              <TabsTrigger value="faq" className="flex-1 data-[state=active]:bg-white/10">
                <FileText size={16} className="mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex-1 data-[state=active]:bg-white/10">
                <BookOpen size={16} className="mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex-1 data-[state=active]:bg-white/10">
                <Mail size={16} className="mr-2" />
                Contact Us
              </TabsTrigger>
              <TabsTrigger value="live" className="flex-1 data-[state=active]:bg-white/10">
                <MessageCircle size={16} className="mr-2" />
                Live Chat
              </TabsTrigger>
            </TabsList>
            
            {/* FAQ */}
            <TabsContent value="faq">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="glass-morphism border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-primary/40"
                  >
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-white/70">{faq.answer}</p>
                  </div>
                ))}
                
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    className="glass-morphism bg-white/5 border-white/10"
                    onClick={() => navigate('/documentation')}
                  >
                    View all FAQs
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Documentation */}
            <TabsContent value="docs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="glass-morphism border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-primary/40"
                  onClick={() => navigate('/documentation')}
                >
                  <div className="flex items-start">
                    <div className="bg-primary/20 p-3 rounded-lg mr-4">
                      <BookOpen className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                      <p className="text-white/70 mb-4">Learn the basics of creating your first Web3 website with our platform.</p>
                      <Button variant="link" className="px-0 text-primary">
                        Read Guide <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div 
                  className="glass-morphism border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-primary/40"
                  onClick={() => navigate('/documentation')}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      <LifeBuoy className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Tutorials</h3>
                      <p className="text-white/70 mb-4">Step-by-step tutorials for building different types of Web3 websites.</p>
                      <Button variant="link" className="px-0 text-blue-500">
                        View Tutorials <ChevronRight size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <Button onClick={() => navigate('/documentation')}>
                  Browse All Documentation
                </Button>
              </div>
            </TabsContent>
            
            {/* Contact Form */}
            <TabsContent value="contact">
              <div className="glass-morphism border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-semibold mb-6 text-center">Get in Touch</h3>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Message sent",
                    description: "We've received your message and will respond within 24 hours.",
                  });
                }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/70 mb-2">Your Name</label>
                      <Input 
                        className="glass-morphism bg-white/5 border border-white/10" 
                        placeholder="Enter your name" 
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-2">Email Address</label>
                      <Input 
                        className="glass-morphism bg-white/5 border border-white/10" 
                        placeholder="Enter your email" 
                        type="email" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white/70 mb-2">Subject</label>
                    <Input 
                      className="glass-morphism bg-white/5 border border-white/10" 
                      placeholder="What's this about?" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/70 mb-2">Message</label>
                    <textarea 
                      className="w-full glass-morphism bg-white/5 border border-white/10 rounded-md px-4 py-2 min-h-[150px]" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <Button type="submit" size="lg">
                      Send Message
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Live Chat */}
            <TabsContent value="live">
              <div className="text-center glass-morphism border border-white/10 rounded-xl p-8">
                <div className="bg-primary/20 p-4 rounded-full inline-block mb-6">
                  <MessageCircle size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Live Chat Support</h3>
                <p className="text-white/70 mb-6 max-w-xl mx-auto">
                  Our support team is available Monday through Friday, 9am-5pm ET. 
                  Start a chat now to get immediate assistance with your questions.
                </p>
                <Button 
                  size="lg"
                  onClick={() => {
                    toast({
                      title: "Chat initiated",
                      description: "Connecting you with a support agent...",
                    });
                  }}
                >
                  Start Chat Now
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
