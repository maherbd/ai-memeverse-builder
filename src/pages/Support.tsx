
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Mail, 
  HelpCircle, 
  MessageCircle, 
  Search,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const FAQs = [
  {
    question: "How do I connect my custom domain?",
    answer: "Go to your project settings, navigate to the 'Custom Domain' section, and follow the instructions to add your domain and update DNS settings. Once DNS changes propagate (up to 48 hours), your domain will be connected."
  },
  {
    question: "What blockchains does Reham support?",
    answer: "Reham currently supports Ethereum, Solana, Binance Smart Chain, and Polygon. We're constantly adding support for additional blockchains to meet our users' needs."
  },
  {
    question: "How do I add token price information to my website?",
    answer: "In the editor, go to the Web3 Integration settings and enter your token contract address. You can then add price charts and token data components to your pages, which will automatically display real-time information."
  },
  {
    question: "Can I export my website code?",
    answer: "Yes, with a Pro subscription you can export your website's code for self-hosting or further customization. The exported code includes all HTML, CSS, JavaScript, and assets used in your site."
  },
  {
    question: "How do I update my website after publishing?",
    answer: "You can make changes to your website anytime by logging into your Reham dashboard and opening the editor. Any changes you make will be saved as drafts until you publish them."
  },
  {
    question: "Is there a limit to how many websites I can create?",
    answer: "Free accounts can create up to 3 websites. Pro accounts have unlimited website creation. Check our pricing page for details on all plan features."
  },
  {
    question: "How do I add a 'Connect Wallet' button to my site?",
    answer: "The 'Connect Wallet' functionality is built into all our templates. You can enable or disable it in the Web3 Integration settings of the editor. You can also customize the appearance and position of the button."
  },
  {
    question: "Can I migrate my existing website to Reham?",
    answer: "We don't currently support direct imports of existing websites. However, you can recreate your site using our templates and editor, often in less time than it would take to migrate the old site."
  },
];

const Support = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(FAQs);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter FAQs based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFAQs(FAQs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = FAQs.filter(
        faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
      );
      setFilteredFAQs(filtered);
    }
  }, [searchQuery]);
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setContactSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond shortly.",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Support Center</h1>
            <p className="text-white/70 text-lg">
              Get help with Reham and find answers to common questions
            </p>
          </div>
          
          <div className="mb-12 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                type="text"
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-morphism bg-white/5 border-white/10"
              />
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-200">
            <Tabs defaultValue="faqs" className="w-full">
              <div className="flex justify-center mb-6">
                <TabsList className="glass-morphism bg-background/50 border border-white/10">
                  <TabsTrigger value="faqs" className="data-[state=active]:bg-white/10">
                    <HelpCircle size={16} className="mr-1" />
                    FAQs
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-white/10">
                    <MessageSquare size={16} className="mr-1" />
                    Contact Us
                  </TabsTrigger>
                  <TabsTrigger value="community" className="data-[state=active]:bg-white/10">
                    <MessageCircle size={16} className="mr-1" />
                    Community
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="faqs" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  <Card className="glass-morphism border-white/10 bg-white/5 mb-6">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                      
                      {filteredFAQs.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-white/70 mb-2">No results found for "{searchQuery}"</p>
                          <p className="text-white/50 text-sm">Try a different search term or browse all FAQs</p>
                        </div>
                      )}
                      
                      <Accordion type="single" collapsible className="w-full">
                        {filteredFAQs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-white/70">{faq.answer}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                  
                  <div className="text-center">
                    <p className="text-white/70 mb-4">
                      Can't find what you're looking for? Reach out to our support team.
                    </p>
                    <Button 
                      onClick={() => document.querySelector('[data-state="inactive"][data-value="contact"]')?.click()} 
                      variant="outline"
                      className="glass-morphism border-white/10 hover:bg-white/5"
                    >
                      Contact Support
                      <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  <Card className="glass-morphism border-white/10 bg-white/5">
                    <CardContent className="p-6">
                      {contactSubmitted ? (
                        <div className="text-center py-8">
                          <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                              <CheckCircle2 className="text-primary" size={32} />
                            </div>
                          </div>
                          <h2 className="text-2xl font-bold mb-2">Message Received!</h2>
                          <p className="text-white/70 mb-6">
                            Thanks for reaching out. Our support team will get back to you shortly.
                          </p>
                          <Button onClick={() => setContactSubmitted(false)}>
                            Send Another Message
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
                          
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                  id="name"
                                  placeholder="Your name" 
                                  className="glass-morphism bg-white/5 border-white/10 mt-1"
                                  required
                                />
                              </div>
                              
                              <div>
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                  id="email"
                                  type="email"
                                  placeholder="Your email address" 
                                  className="glass-morphism bg-white/5 border-white/10 mt-1"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="subject">Subject</Label>
                              <Input 
                                id="subject"
                                placeholder="What's this about?" 
                                className="glass-morphism bg-white/5 border-white/10 mt-1"
                                required
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="message">Message</Label>
                              <Textarea 
                                id="message"
                                placeholder="Describe your issue in detail" 
                                className="glass-morphism bg-white/5 border-white/10 mt-1"
                                rows={6}
                                required
                              />
                            </div>
                            
                            <div className="pt-4">
                              <Button type="submit" className="w-full md:w-auto">
                                <Mail size={16} className="mr-2" />
                                Send Message
                              </Button>
                            </div>
                          </form>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="community" className="mt-6">
                <div className="max-w-3xl mx-auto">
                  <Card className="glass-morphism border-white/10 bg-white/5">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-6">Community Support</h2>
                      
                      <div className="space-y-8">
                        <p className="text-white/70">
                          Join our vibrant community of Reham users to get help, share tips,
                          and connect with fellow Web3 builders.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <a 
                            href="https://discord.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-morphism border border-white/10 p-6 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 rounded-full bg-[#5865F2]/20 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#5865F2]">
                                  <circle cx="9" cy="12" r="1"></circle>
                                  <circle cx="15" cy="12" r="1"></circle>
                                  <path d="M7.5 7.5c3.5-1 5.5-1 9 0"></path>
                                  <path d="M7.5 16.5c3.5 1 5.5 1 9 0"></path>
                                  <path d="M15.5 17c0 1 1.5 3 2 3 1.5 0 2.833-1.667 3.5-3 .667-1.667.5-5.833-1.5-11.5-1.457-1.015-3-1.34-4.5-1.5l-1 2.5"></path>
                                  <path d="M8.5 17c0 1-1.356 3-1.832 3-1.429 0-2.698-1.667-3.333-3-.635-1.667-.48-5.833 1.428-11.5C6.151 4.485 7.545 4.16 9 4l1 2.5"></path>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">Discord Community</h3>
                                <p className="text-white/60 text-sm">Join 5,000+ members</p>
                              </div>
                            </div>
                            <p className="text-white/70 text-sm">
                              Our Discord server is the hub for real-time help and discussions.
                              Get instant answers and connect with other users.
                            </p>
                          </a>
                          
                          <a 
                            href="https://t.me" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-morphism border border-white/10 p-6 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0088cc]">
                                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                                  <path d="M22 2 11 13"></path>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">Telegram Group</h3>
                                <p className="text-white/60 text-sm">Join 3,200+ members</p>
                              </div>
                            </div>
                            <p className="text-white/70 text-sm">
                              Our Telegram group is perfect for mobile users who want
                              to stay connected and get support on the go.
                            </p>
                          </a>
                          
                          <a 
                            href="https://forum.reham.org" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-morphism border border-white/10 p-6 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">Community Forum</h3>
                                <p className="text-white/60 text-sm">Detailed discussions & guides</p>
                              </div>
                            </div>
                            <p className="text-white/70 text-sm">
                              Our forum contains in-depth tutorials, feature requests,
                              and longer-form discussions about Reham.
                            </p>
                          </a>
                          
                          <a 
                            href="https://twitter.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-morphism border border-white/10 p-6 rounded-xl hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1DA1F2]">
                                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">Twitter</h3>
                                <p className="text-white/60 text-sm">Latest updates & tips</p>
                              </div>
                            </div>
                            <p className="text-white/70 text-sm">
                              Follow us on Twitter for the latest news, feature
                              announcements, and quick tips.
                            </p>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
