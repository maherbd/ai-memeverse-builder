
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText, Code } from 'lucide-react';

const DocumentationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize scroll animations
  useScrollAnimation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Documentation</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Everything you need to know about building, customizing, and deploying your Web3 website.
            </p>
            
            <div className="relative max-w-md mx-auto mt-8">
              <Input 
                type="text"
                placeholder="Search documentation..."
                className="glass-morphism bg-white/5 border-white/10 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
              <Button 
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-3"
                size="sm"
              >
                Search
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="guides" className="w-full max-w-4xl mx-auto animate-fade-in animate-delay-100">
            <TabsList className="grid grid-cols-2 mb-8 glass-morphism bg-white/5 border border-white/10 p-1 w-full max-w-md mx-auto">
              <TabsTrigger value="guides" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <FileText className="h-4 w-4 mr-2" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="api" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Code className="h-4 w-4 mr-2" />
                API
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="guides" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-morphism bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                  <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
                  <p className="text-white/70 mb-4">Learn the basics of setting up your Web3 website with our platform.</p>
                  <ul className="space-y-3 text-white/60">
                    <li className="hover:text-primary">• Introduction to Reham</li>
                    <li className="hover:text-primary">• Choosing the right template</li>
                    <li className="hover:text-primary">• Setting up your workspace</li>
                    <li className="hover:text-primary">• Customizing your project</li>
                  </ul>
                </div>
                
                <div className="glass-morphism bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                  <h3 className="text-xl font-semibold mb-3">Wallet Integration</h3>
                  <p className="text-white/70 mb-4">Connect different wallet providers to your website.</p>
                  <ul className="space-y-3 text-white/60">
                    <li className="hover:text-primary">• Setting up Solana wallet</li>
                    <li className="hover:text-primary">• Web3 authentication</li>
                    <li className="hover:text-primary">• Managing wallet states</li>
                    <li className="hover:text-primary">• Handling transactions</li>
                  </ul>
                </div>
                
                <div className="glass-morphism bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                  <h3 className="text-xl font-semibold mb-3">Smart Contract Integration</h3>
                  <p className="text-white/70 mb-4">Interact with blockchain contracts from your website.</p>
                  <ul className="space-y-3 text-white/60">
                    <li className="hover:text-primary">• Connecting to contracts</li>
                    <li className="hover:text-primary">• Reading contract data</li>
                    <li className="hover:text-primary">• Writing transactions</li>
                    <li className="hover:text-primary">• Handling events</li>
                  </ul>
                </div>
                
                <div className="glass-morphism bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition">
                  <h3 className="text-xl font-semibold mb-3">Deployment</h3>
                  <p className="text-white/70 mb-4">Launch your website to production environments.</p>
                  <ul className="space-y-3 text-white/60">
                    <li className="hover:text-primary">• Publishing your website</li>
                    <li className="hover:text-primary">• Setting up custom domains</li>
                    <li className="hover:text-primary">• IPFS deployment</li>
                    <li className="hover:text-primary">• Continuous integration</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api" className="mt-0">
              <div className="glass-morphism bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">API Reference</h3>
                <p className="text-white/70 mb-6">Comprehensive documentation for our platform APIs and integrations.</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Reham Web3 API</h4>
                    <p className="text-white/60 mb-3">Core APIs for website generation and management</p>
                    <ul className="space-y-2 text-white/60 pl-4">
                      <li className="hover:text-primary">• Project Management</li>
                      <li className="hover:text-primary">• Template API</li>
                      <li className="hover:text-primary">• Analytics Endpoints</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Blockchain Connectors</h4>
                    <p className="text-white/60 mb-3">APIs for interacting with various blockchains</p>
                    <ul className="space-y-2 text-white/60 pl-4">
                      <li className="hover:text-primary">• Solana RPC API</li>
                      <li className="hover:text-primary">• Web3.js Integration</li>
                      <li className="hover:text-primary">• Transaction API</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Extensions</h4>
                    <p className="text-white/60 mb-3">APIs for platform extensions and plugins</p>
                    <ul className="space-y-2 text-white/60 pl-4">
                      <li className="hover:text-primary">• Analytics Extension</li>
                      <li className="hover:text-primary">• Social Integration API</li>
                      <li className="hover:text-primary">• Marketplace Extension</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">API Keys</h4>
                    <p className="text-white/60 mb-3">Required API keys for full platform functionality</p>
                    <ul className="space-y-2 text-white/60 pl-4">
                      <li className="hover:text-primary">• Perplexity API</li>
                      <li className="hover:text-primary">• Solana RPC</li>
                      <li className="hover:text-primary">• CoinGecko API</li>
                      <li className="hover:text-primary">• Web3.Storage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DocumentationPage;
