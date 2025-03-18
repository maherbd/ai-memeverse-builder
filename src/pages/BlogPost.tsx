
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { blogPosts } from '@/data/blogData';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import BlogCard from '@/components/blog/BlogCard';
import NewsletterSignup from '@/components/blog/NewsletterSignup';

const BlogPost = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Get the post ID from URL params
  const { id } = useParams<{ id: string }>();
  
  // Find the post with the matching ID
  const post = blogPosts.find(post => post.id === id);
  
  // Get related posts (exclude current post and limit to 3)
  const relatedPosts = blogPosts
    .filter(p => p.id !== id)
    .slice(0, 3);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // If post not found, show a message
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="text-primary hover:underline flex items-center justify-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
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
          <Link to="/blog" className="inline-flex items-center text-sm text-white/70 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
          
          <article className="max-w-4xl mx-auto mb-16">
            <div className="animate-fade-in">
              <div className="flex items-center mb-4">
                <Badge variant="outline" className="text-xs glass-morphism bg-white/5 border-white/10">
                  {post.category}
                </Badge>
                <span className="text-white/60 text-xs ml-2">{post.date}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-white/60 text-sm">{post.readTime}</div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden mb-10 animate-fade-in animate-delay-100">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none animate-fade-in animate-delay-200">
              <p className="lead text-xl">
                {post.excerpt}
              </p>
              <p>
                Web3 websites are becoming increasingly important as the decentralized web continues to evolve. For projects in the cryptocurrency space, having a professional and engaging online presence is crucial for building credibility and connecting with potential users.
              </p>
              <h2>Why Your Web3 Project Needs a Great Website</h2>
              <p>
                In the competitive world of blockchain projects, first impressions matter tremendously. A well-designed website serves as the front door to your project, offering visitors their first glimpse into your ecosystem. Beyond aesthetics, your website should effectively communicate your project's value proposition, technical underpinnings, and community dynamics.
              </p>
              <p>
                Many projects underestimate the importance of a professional web presence, focusing instead on technical development or token economics. However, even the most innovative blockchain technology can fail to gain traction if it's presented poorly online.
              </p>
              <h2>Key Elements of Successful Web3 Websites</h2>
              <p>
                The most effective Web3 websites share several common characteristics:
              </p>
              <ul>
                <li>Clean, modern design that reflects the project's brand identity</li>
                <li>Clear explanation of the project's purpose and value proposition</li>
                <li>Straightforward ways to engage with the project (wallet connections, app access)</li>
                <li>Transparent information about the team, tokenomics, and roadmap</li>
                <li>Community-building features like social links and newsletter subscriptions</li>
              </ul>
              <p>
                By focusing on these elements, Web3 projects can create digital experiences that not only showcase their technology but also build trust with potential users and investors.
              </p>
            </div>
          </article>
          
          {/* Related Articles */}
          <div className="mb-16 animate-fade-in animate-delay-300">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <NewsletterSignup />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
