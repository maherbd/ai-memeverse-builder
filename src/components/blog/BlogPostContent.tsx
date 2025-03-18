
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, ThumbsUp, ThumbsDown, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 relative">
      <div className="flex justify-between items-center bg-slate-800 text-white/70 text-sm px-4 py-2 rounded-t-md">
        <span>{language}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={copyToClipboard}
          className="text-white/70 hover:text-white"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </Button>
      </div>
      <pre className="bg-slate-900 p-4 overflow-x-auto rounded-b-md text-sm text-white/80">
        <code>{code}</code>
      </pre>
    </div>
  );
};

interface BlogPostContentProps {
  content: React.ReactNode;
}

const BlogPostContent = ({ content }: BlogPostContentProps) => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const { toast } = useToast();
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The article link has been copied to your clipboard.",
      });
    }
  };
  
  return (
    <div className="animate-fade-in animate-delay-200">
      <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-primary">
        {content}
      </div>
      
      <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-white/70 mr-2">Was this article helpful?</p>
          <Button 
            variant="outline" 
            size="sm" 
            className={`glass-morphism border-white/10 ${liked === true ? 'bg-green-500/20 border-green-500/30' : ''}`}
            onClick={() => {
              setLiked(true);
              toast({
                title: "Thank you!",
                description: "We appreciate your feedback.",
              });
            }}
          >
            <ThumbsUp size={14} className="mr-1" />
            Yes
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`glass-morphism border-white/10 ${liked === false ? 'bg-red-500/20 border-red-500/30' : ''}`}
            onClick={() => {
              setLiked(false);
              toast({
                title: "Thank you!",
                description: "We'll work to improve our content.",
              });
            }}
          >
            <ThumbsDown size={14} className="mr-1" />
            No
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="glass-morphism border-white/10"
          onClick={handleShare}
        >
          <Share size={14} className="mr-1" />
          Share Article
        </Button>
      </div>
    </div>
  );
};

export { BlogPostContent, CodeBlock };
