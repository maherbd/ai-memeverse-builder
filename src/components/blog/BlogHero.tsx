
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
};

interface BlogHeroProps {
  post: BlogPost;
}

const BlogHero = ({ post }: BlogHeroProps) => {
  return (
    <div className="mb-16 animate-fade-in animate-delay-100">
      <Link to={`/blog/${post.id}`} className="block">
        <div className="glass-morphism border border-white/10 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-video md:aspect-auto">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <Badge variant="outline" className="text-xs glass-morphism bg-white/5 border-white/10">
                  {post.category}
                </Badge>
                <span className="text-white/60 text-xs ml-2">{post.date}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-white/70 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-2">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-sm">{post.author}</span>
                </div>
                <span className="text-white/60 text-xs">{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogHero;
