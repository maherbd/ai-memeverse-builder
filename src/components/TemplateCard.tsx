
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  isPro: boolean;
}

const TemplateCard = ({
  id,
  name,
  description,
  image,
  category,
  isPro,
}: TemplateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative rounded-xl overflow-hidden transition-all duration-300 animate-on-scroll opacity-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-opacity duration-300 p-6 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button 
            variant="default" 
            size="sm" 
            className="w-full"
            asChild
          >
            <Link to={`/templates/${id}`}>
              <Eye size={16} className="mr-2" />
              Preview
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="w-full glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <Link to={`/dashboard/create?template=${id}`}>
              <Copy size={16} className="mr-2" />
              Use Template
            </Link>
          </Button>
        </div>
        
        {/* Pro Badge */}
        {isPro && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-primary rounded text-xs font-semibold">
            PRO
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <span className="text-xs text-white/60 px-2 py-1 glass-morphism rounded-full">
            {category}
          </span>
        </div>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default TemplateCard;
