
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { blogPosts } from '@/data/blogData';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import BlogPostAuthor from '@/components/blog/BlogPostAuthor';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(blogPosts.find(post => post.id === id));
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [id]);
  
  // If post not found, use the first post as fallback
  useEffect(() => {
    if (!post && blogPosts.length > 0) {
      setPost(blogPosts[0]);
    }
  }, [post]);
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
        <Link to="/blog">
          <Button>Return to Blog</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <Link to="/blog" className="inline-flex items-center text-white/70 hover:text-white transition-colors">
              <ChevronLeft size={16} className="mr-1" />
              Back to Blog
            </Link>
          </div>
          
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-12 animate-fade-in">
            {loading ? (
              <>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-8" />
                <Skeleton className="h-96 w-full rounded-xl" />
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-8 text-white/70">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center">
                    <Tag size={16} className="mr-1" />
                    {post.category}
                  </span>
                </div>
                
                <div className="rounded-xl overflow-hidden mb-8 aspect-[2/1]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
          
          {/* Content */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in animate-delay-100">
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-20 w-full my-8" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-white/80 mb-6">{post.excerpt}</p>
                
                <h2>Introduction</h2>
                <p>
                  In the fast-paced world of Web3, creating a standout website is essential for project success. 
                  This article explores how to implement best practices and innovative techniques to make your 
                  blockchain project website not just functional, but exceptional.
                </p>
                
                <h2>Why This Matters</h2>
                <p>
                  A well-designed website serves as the central hub for your community, investors, and users. 
                  It's often the first point of contact for people discovering your project, making it crucial 
                  for establishing credibility and communicating your vision effectively.
                </p>
                
                <p>
                  Recent studies show that Web3 projects with professional websites are 3.5x more likely to 
                  attract and retain community members compared to those with basic or outdated sites.
                </p>
                
                <blockquote>
                  "Your website is the digital headquarters for your Web3 project. It should exemplify the 
                  innovation your blockchain solution promises."
                </blockquote>
                
                <h2>Key Implementation Steps</h2>
                <p>
                  Implementing these techniques requires attention to detail and a user-centric approach. 
                  Start by identifying your primary audience and tailoring the experience to meet their 
                  specific needs and technical expertise level.
                </p>
                
                <p>
                  Remember that Web3 is about decentralization and community ownership. Your website should 
                  reflect these values while still providing a seamless, intuitive experience that bridges 
                  the gap between traditional web users and the decentralized future.
                </p>
                
                <h2>Conclusion</h2>
                <p>
                  As Web3 continues to evolve, so too will the standards for project websites. By staying 
                  ahead of design and functionality trends, your project can stand out in an increasingly 
                  crowded space. The extra effort invested in creating an exceptional web presence will 
                  pay dividends in community engagement, user trust, and overall project success.
                </p>
              </div>
            )}
          </div>
          
          {/* Author */}
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in animate-delay-200">
            {loading ? (
              <Skeleton className="h-40 w-full rounded-xl" />
            ) : (
              <BlogPostAuthor 
                author={post.author} 
                date={post.date} 
                readTime={post.readTime} 
              />
            )}
          </div>
          
          {/* Related Posts (Coming soon) */}
          
          {/* Newsletter */}
          <div className="mb-16">
            <NewsletterSignup />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
