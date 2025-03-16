
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Code, Puzzle, Globe, Shield, Database } from 'lucide-react';

const Documentation = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Documentation</h1>
            <p className="text-white/70 text-lg">
              Learn how to use Reham to create stunning Web3 websites
            </p>
          </div>
          
          <div className="animate-fade-in animate-delay-100">
            <Tabs defaultValue="getting-started" className="w-full">
              <div className="mb-6 overflow-x-auto">
                <TabsList className="glass-morphism bg-background/50 border border-white/10">
                  <TabsTrigger value="getting-started" className="data-[state=active]:bg-white/10">
                    <FileText size={16} className="mr-1" />
                    Getting Started
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="data-[state=active]:bg-white/10">
                    <Puzzle size={16} className="mr-1" />
                    Templates
                  </TabsTrigger>
                  <TabsTrigger value="custom-domains" className="data-[state=active]:bg-white/10">
                    <Globe size={16} className="mr-1" />
                    Custom Domains
                  </TabsTrigger>
                  <TabsTrigger value="web3" className="data-[state=active]:bg-white/10">
                    <Database size={16} className="mr-1" />
                    Web3 Integration
                  </TabsTrigger>
                  <TabsTrigger value="api" className="data-[state=active]:bg-white/10">
                    <Code size={16} className="mr-1" />
                    API Reference
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-white/10">
                    <Shield size={16} className="mr-1" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="getting-started" className="mt-6">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Getting Started with Reham</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
                        <p className="text-white/70">
                          Sign up for a Reham account using your email or by connecting your wallet.
                          Once registered, you'll have access to all our website building features.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">2. Choose a Template</h3>
                        <p className="text-white/70">
                          Browse our collection of Web3 website templates and select one that matches your project's needs.
                          We offer templates for meme coins, DeFi protocols, NFT projects, and more.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">3. Customize Your Website</h3>
                        <p className="text-white/70">
                          Use our intuitive editor to customize your website's content, colors, fonts, and layout.
                          No coding knowledge required! Everything is visual and easy to use.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">4. Connect Your Web3 Project</h3>
                        <p className="text-white/70">
                          Integrate your token contract, connect to blockchain data, and add Web3 features like wallet connection.
                          Our platform supports Ethereum, Solana, and other major blockchains.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">5. Publish Your Website</h3>
                        <p className="text-white/70">
                          Once you're happy with your website, publish it with a single click.
                          Your site will be live instantly on our fast, reliable hosting infrastructure.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-6">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Working with Templates</h2>
                    
                    <div className="space-y-6">
                      <p className="text-white/70">
                        Reham offers a variety of professionally designed templates optimized for Web3 projects.
                        Each template is fully customizable and can be adapted to your specific needs.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Template Categories</h3>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li><strong>Meme Coin Templates:</strong> Vibrant designs for community-driven token projects</li>
                          <li><strong>DeFi Templates:</strong> Professional layouts for decentralized finance applications</li>
                          <li><strong>NFT Templates:</strong> Gallery-focused designs for NFT collections and marketplaces</li>
                          <li><strong>DAO Templates:</strong> Governance-oriented sites for decentralized organizations</li>
                          <li><strong>Launchpad Templates:</strong> Pre-sale and IDO templates for token launches</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Customization Options</h3>
                        <p className="text-white/70">
                          All templates can be extensively customized:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li>Change colors, fonts, and overall design theme</li>
                          <li>Add, remove, or rearrange sections</li>
                          <li>Customize content, images, and graphics</li>
                          <li>Integrate Web3 functionality specific to your project</li>
                          <li>Modify layout and structure to match your brand</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="custom-domains" className="mt-6">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Custom Domains</h2>
                    
                    <div className="space-y-6">
                      <p className="text-white/70">
                        Connect your own domain name to your Reham website for a professional online presence.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Setting Up Your Domain</h3>
                        <ol className="list-decimal pl-6 space-y-4 text-white/70">
                          <li>
                            <strong>Purchase a Domain:</strong> If you don't already have a domain name,
                            purchase one from a domain registrar like Namecheap, GoDaddy, or Google Domains.
                          </li>
                          <li>
                            <strong>Add Domain in Reham:</strong> Go to your project settings,
                            navigate to the "Custom Domain" section, and enter your domain name.
                          </li>
                          <li>
                            <strong>Configure DNS Settings:</strong> Follow our instructions to update your
                            DNS records at your domain registrar. This typically involves adding CNAME or A records.
                          </li>
                          <li>
                            <strong>Verify Domain:</strong> Once DNS changes propagate (which can take up to 48 hours),
                            Reham will verify your domain and activate it for your website.
                          </li>
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">SSL Certificates</h3>
                        <p className="text-white/70">
                          All Reham websites, including those with custom domains, are automatically
                          equipped with SSL certificates for secure HTTPS connections. No additional
                          setup is required for SSL.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="web3" className="mt-6">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Web3 Integration</h2>
                    
                    <div className="space-y-6">
                      <p className="text-white/70">
                        Reham makes it easy to integrate blockchain functionality into your website.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Supported Blockchains</h3>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li><strong>Ethereum:</strong> Full support for ERC-20 tokens and Ethereum mainnet</li>
                          <li><strong>Solana:</strong> Native integration with Solana blockchain and SPL tokens</li>
                          <li><strong>Binance Smart Chain:</strong> Support for BEP-20 tokens and BSC dApps</li>
                          <li><strong>Polygon:</strong> Integration with Polygon network for scalable dApps</li>
                          <li><strong>And more:</strong> Expanding support for additional blockchains</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Web3 Features</h3>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li><strong>Wallet Connection:</strong> Allow users to connect their Web3 wallets</li>
                          <li><strong>Token Data:</strong> Display token price, market cap, and supply information</li>
                          <li><strong>Price Charts:</strong> Embed real-time price charts from DexTools or DexScreener</li>
                          <li><strong>Smart Contract Integration:</strong> Connect to your project's smart contracts</li>
                          <li><strong>"Buy Now" Buttons:</strong> Direct links to DEXes where your token trades</li>
                          <li><strong>NFT Galleries:</strong> Display NFT collections with metadata</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="api" className="mt-6">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">API Reference</h2>
                    
                    <div className="space-y-6">
                      <p className="text-white/70">
                        Reham provides APIs for developers who want to extend functionality or integrate with other services.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">REST API</h3>
                        <p className="text-white/70">
                          Our REST API allows you to programmatically manage your Reham websites and access blockchain data.
                        </p>
                        <div className="mt-4 p-4 bg-black/30 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>
                            {`// Example API request to fetch token data
fetch('https://api.reham.org/v1/token/0x1234...', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Webhook Integration</h3>
                        <p className="text-white/70">
                          Set up webhooks to receive notifications about website events and blockchain activity.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">JavaScript SDK</h3>
                        <p className="text-white/70">
                          Our JavaScript SDK provides easy-to-use functions for integrating Reham with your custom code.
                        </p>
                        <div className="mt-4 p-4 bg-black/30 rounded-md font-mono text-sm overflow-x-auto">
                          <pre>
                            {`// Example SDK usage
import { Reham } from '@reham/sdk';

const reham = new Reham('YOUR_API_KEY');
const tokenData = await reham.getTokenData('0x1234...');`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Security</h2>
                    
                    <div className="space-y-6">
                      <p className="text-white/70">
                        At Reham, we take security seriously and implement multiple measures to protect your website and data.
                      </p>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Infrastructure Security</h3>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li><strong>DDoS Protection:</strong> Enterprise-grade protection against distributed denial-of-service attacks</li>
                          <li><strong>WAF (Web Application Firewall):</strong> Advanced filtering to block malicious traffic</li>
                          <li><strong>Regular Security Audits:</strong> Our infrastructure undergoes regular security assessments</li>
                          <li><strong>Data Encryption:</strong> All data is encrypted both in transit and at rest</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Smart Contract Security</h3>
                        <p className="text-white/70">
                          When integrating with blockchain contracts:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li>We use read-only methods by default to prevent unauthorized transactions</li>
                          <li>All transaction requests require explicit user approval via their wallet</li>
                          <li>We validate contract interactions on the client side before execution</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Account Security</h3>
                        <ul className="list-disc pl-6 space-y-2 text-white/70">
                          <li><strong>2FA (Two-Factor Authentication):</strong> Available for all accounts</li>
                          <li><strong>Wallet Authentication:</strong> Secure sign-in with Web3 wallets</li>
                          <li><strong>Session Management:</strong> Automatic session timeouts and device tracking</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
