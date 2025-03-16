
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, Edit, Trash2, Copy, Eye, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  domain: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ id, name, description, image, domain, createdAt, onDelete }: ProjectCardProps) => {
  const { toast } = useToast();
  
  const copyDomain = () => {
    navigator.clipboard.writeText(domain);
    toast({
      title: "Domain Copied",
      description: "The domain has been copied to your clipboard.",
    });
  };
  
  return (
    <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden animate-on-scroll opacity-0">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <h3 className="font-bold text-xl">{name}</h3>
          <span className="text-xs text-white/60">Created {createdAt}</span>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-white/60 text-xs mr-2">Domain:</span>
          <a 
            href={`https://${domain}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary text-sm hover:underline flex items-center"
          >
            {domain}
            <ExternalLink size={12} className="ml-1" />
          </a>
          <button
            onClick={copyDomain}
            className="ml-auto text-white/60 hover:text-white p-1 transition-colors"
            aria-label="Copy domain"
          >
            <Copy size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <Link to={`/dashboard/edit/${id}`}>
              <Edit size={14} className="mr-1" />
              Edit
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <Link to={`/dashboard/analytics/${id}`}>
              <BarChart3 size={14} className="mr-1" />
              Stats
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
              <Eye size={14} className="mr-1" />
              View
            </a>
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            className="col-span-3 mt-2"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={14} className="mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
