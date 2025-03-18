
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
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

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="glass-morphism border-white/10 bg-white/5 h-full hover:shadow-lg transition-shadow overflow-hidden">
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
  );
};

export default BlogCard;
