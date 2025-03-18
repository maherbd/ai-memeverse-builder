
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import BlogHero from '@/components/blog/BlogHero';
import BlogCard from '@/components/blog/BlogCard';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import { blogPosts } from '@/data/blogData';

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
          <BlogHero post={featuredPost} />
          
          {/* Recent Posts */}
          <div className="mb-12 animate-fade-in animate-delay-200">
            <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
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

export default Blog;
