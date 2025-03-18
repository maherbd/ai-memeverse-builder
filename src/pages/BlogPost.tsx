
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { blogPosts } from '@/data/blogData';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogPostAuthor from '@/components/blog/BlogPostAuthor';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { BlogPostContent, CodeBlock } from '@/components/blog/BlogPostContent';

// Example content for the post
const getExampleContent = (title: string) => (
  <>
    <p>
      Web3 technology is revolutionizing how we interact with the digital world, creating new opportunities for decentralized applications and services. This article explores the key considerations when building a Web3 website.
    </p>
    
    <h2>Understanding Web3 Architecture</h2>
    <p>
      Unlike traditional websites, Web3 sites interact with blockchain networks, allowing for decentralized storage, authentication, and transactions. This fundamental shift requires developers to approach design and functionality differently.
    </p>
    
    <p>
      The core components of a Web3 website typically include:
    </p>
    
    <ul>
      <li>Wallet connection interface</li>
      <li>Smart contract interaction layer</li>
      <li>Decentralized storage integration</li>
      <li>Token-gated access controls</li>
    </ul>
    
    <h2>Code Implementation</h2>
    <p>
      Here's a simple example of a wallet connection component using ethers.js:
    </p>
    
    <CodeBlock 
      language="TypeScript" 
      code={`import { ethers } from 'ethers';
import { useState } from 'react';

const WalletConnect = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask or another Ethereum wallet.");
    }
  };
  
  return (
    <div>
      {account ? (
        <div>Connected: {account.substring(0, 6)}...{account.substring(38)}</div>
      ) : (
        <button 
          onClick={connectWallet}
          disabled={isConnecting}
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;`} 
    />
    
    <h2>Best Practices for Web3 UX</h2>
    <p>
      Web3 introduces several UX challenges that aren't present in traditional web applications:
    </p>
    
    <ol>
      <li>
        <strong>Wallet Connection Flow:</strong> Make it intuitive for users to connect their wallets with clear feedback throughout the process.
      </li>
      <li>
        <strong>Transaction Feedback:</strong> Provide clear status updates during blockchain transactions, which can take time to confirm.
      </li>
      <li>
        <strong>Error Handling:</strong> Translate complex blockchain errors into user-friendly messages.
      </li>
      <li>
        <strong>Gas Education:</strong> Help users understand transaction fees and gas optimization options.
      </li>
    </ol>
    
    <h2>Security Considerations</h2>
    <p>
      Security is paramount in Web3 development, as exploits can lead to irreversible loss of assets. Always follow these security practices:
    </p>
    
    <ul>
      <li>Never expose private keys in client-side code</li>
      <li>Use established libraries for cryptographic operations</li>
      <li>Implement comprehensive testing for smart contract interactions</li>
      <li>Provide clear transaction previews before submission</li>
      <li>Consider having smart contracts audited by security professionals</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>
      Building {title.toLowerCase()} requires balancing new technological paradigms with established UX best practices. By focusing on creating intuitive user experiences while leveraging the unique capabilities of blockchain technology, developers can create powerful, user-friendly Web3 applications.
    </p>
  </>
);

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<typeof blogPosts[0] | null>(null);
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Find the post based on ID
  useEffect(() => {
    const foundPost = blogPosts.find(post => post.id === id);
    setPost(foundPost || null);
  }, [id]);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <p className="mb-6 text-white/70">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-8 animate-fade-in">
            <Link to="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-1" />
                Back to Blog
              </Button>
            </Link>
          </div>
          
          {/* Article Header */}
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-xs glass-morphism border border-white/10 rounded-full px-3 py-1 flex items-center">
                <Tag size={12} className="mr-1 text-primary" />
                {post.category}
              </span>
              <span className="text-xs glass-morphism border border-white/10 rounded-full px-3 py-1 flex items-center">
                <Calendar size={12} className="mr-1 text-white/60" />
                {post.date}
              </span>
              <span className="text-xs glass-morphism border border-white/10 rounded-full px-3 py-1 flex items-center">
                <Clock size={12} className="mr-1 text-white/60" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
            <p className="text-xl text-white/70 leading-relaxed">{post.excerpt}</p>
          </div>
          
          {/* Hero Image */}
          <div className="max-w-5xl mx-auto mb-12 animate-fade-in animate-delay-100">
            <div className="aspect-[21/9] rounded-xl overflow-hidden glass-morphism border border-white/10 p-1">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Author Info */}
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in animate-delay-100">
            <BlogPostAuthor 
              author={post.author} 
              date={post.date} 
              readTime={post.readTime}
              twitterUrl="https://twitter.com"
              linkedinUrl="https://linkedin.com"
              websiteUrl="https://example.com"
            />
          </div>
          
          {/* Article Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <BlogPostContent content={getExampleContent(post.title)} />
          </div>
          
          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto mb-16">
            <NewsletterSignup />
          </div>
          
          {/* Related Posts */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 animate-fade-in animate-delay-300">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in animate-delay-300">
              {blogPosts
                .filter(p => p.id !== post.id && p.category === post.category)
                .slice(0, 2)
                .map(relatedPost => (
                  <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group">
                    <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300">
                      <div className="aspect-video relative">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-white/70 text-sm">{relatedPost.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
