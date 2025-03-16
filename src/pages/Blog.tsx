
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

// Mock blog posts data
const blogPosts = [
  {
    id: '1',
    title: 'How to Launch a Successful Meme Coin Website in 2025',
    excerpt: 'Learn the key elements that make a meme coin website stand out and drive community engagement in the competitive crypto space.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
    author: 'Alex Morgan',
    date: 'May 15, 2025',
    category: 'Guide',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: '5 Web3 Design Trends That Will Dominate This Year',
    excerpt: 'Explore the latest design trends in Web3 websites that are capturing user attention and enhancing project credibility.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    author: 'Sarah Chen',
    date: 'May 10, 2025',
    category: 'Design',
    readTime: '6 min read'
  },
  {
    id: '3',
    title: 'Integrating DEX Price Charts Into Your Crypto Website',
    excerpt: 'A step-by-step guide to embedding real-time price charts from popular DEXes to boost your website's utility.',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
    author: 'Michael Rodriguez',
    date: 'May 5, 2025',
    category: 'Tutorial',
    readTime: '10 min read'
  },
  {
    id: '4',
    title: 'The Power of Community in Web3 Projects: Building Your Online Presence',
    excerpt: 'How to leverage your website as a central hub for community building in decentralized projects.',
    image: 'https://images.unsplash.com/photo-1634986666676-ec9e2369d83c?q=80&w=2832&auto=format&fit=crop',
    author: 'Emma Wilson',
    date: 'April 28, 2025',
    category: 'Community',
    readTime: '7 min read'
  },
  {
    id: '5',
    title: 'Custom Domains for Your Web3 Project: Best Practices',
    excerpt: 'Everything you need to know about setting up and managing a custom domain for your blockchain project website.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    author: 'Thomas Green',
    date: 'April 22, 2025',
    category: 'Technical',
    readTime: '5 min read'
  },
  {
    id: '6',
    title: 'From Template to Unique: Customizing Your Reham Website',
    excerpt: 'How to transform a template into a unique website that perfectly represents your brand identity.',
    image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
    author: 'Olivia Johnson',
    date: 'April 15, 2025',
    category: 'Design',
    readTime: '9 min read'
  },
];

// Featured post is the first post
const featuredPost = blogPosts[0];
// Recent posts are all except the featured one
const recentPosts = blogPosts.slice(1);

const Blog = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Blog</h1>
            <p className="text-white/70 text-lg">
              Latest articles, tutorials, and insights about Web3 website development
            </p>
          </div>
          
          {/* Featured Post */}
          <div className="mb-16 animate-fade-in animate-delay-100">
            <Link to={`/blog/${featuredPost.id}`} className="block">
              <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <Badge variant="outline" className="text-xs glass-morphism bg-white/5 border-white/10">
                        {featuredPost.category}
                      </Badge>
                      <span className="text-white/60 text-xs ml-2">{featuredPost.date}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/70 mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <span className="text-sm">{featuredPost.author}</span>
                      </div>
                      <span className="text-white/60 text-xs">{featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Recent Posts */}
          <div className="mb-12 animate-fade-in animate-delay-200">
            <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Card key={post.id} className="glass-morphism border-white/10 bg-white/5 h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <Link to={`/blog/${post.id}`} className="block h-full">
                    <div className="aspect-video">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <Badge variant="outline" className="text-xs glass-morphism bg-white/5 border-white/10">
                          {post.category}
                        </Badge>
                        <span className="text-white/60 text-xs ml-2">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                        <span className="text-sm">{post.author}</span>
                        <span className="text-white/60 text-xs">{post.readTime}</span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="animate-fade-in animate-delay-300">
            <div className="glass-morphism border border-white/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
              <p className="text-white/70 mb-6">
                Subscribe to our newsletter for the latest Web3 website building tips and trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow glass-morphism bg-white/5 border border-white/10 rounded-md px-4 py-2"
                />
                <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors">
                  Subscribe
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
