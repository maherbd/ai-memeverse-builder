
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Linkedin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type BlogPostAuthorProps = {
  author: string;
  date: string;
  readTime: string;
  image?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  bio?: string;
};

const BlogPostAuthor = ({ 
  author, 
  date, 
  readTime, 
  image,
  twitterUrl,
  linkedinUrl,
  websiteUrl,
  bio = "Specializing in blockchain technology and decentralized applications. Passionate about making Web3 concepts accessible to everyone."
}: BlogPostAuthorProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Extract initials for avatar fallback
  const initials = author
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  // Safe URL opener function
  const openUrl = (url: string) => {
    if (!url) return;
    
    // Ensure URL has a protocol
    const safeUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(safeUrl, '_blank', 'noopener,noreferrer');
  };
  
  // Function to copy author profile to clipboard
  const copyAuthorProfile = () => {
    const profileText = `${author}\n${bio}\n${twitterUrl ? `Twitter: ${twitterUrl}\n` : ''}${linkedinUrl ? `LinkedIn: ${linkedinUrl}\n` : ''}${websiteUrl ? `Website: ${websiteUrl}` : ''}`;
    
    navigator.clipboard.writeText(profileText).then(() => {
      setCopied(true);
      toast({
        title: "Profile copied",
        description: "Author information copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    });
  };
    
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 glass-morphism border border-white/10 rounded-xl p-6">
      <Avatar className="w-20 h-20">
        <AvatarImage src={image || `https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold mb-2">{author}</h3>
        <p className="text-white/70 mb-3">
          Web3 Content Creator | Published on {date} • {readTime}
        </p>
        <p className="text-white/60 mb-4">
          {bio}
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          {twitterUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-morphism bg-white/5 border-white/10 hover:border-white/20 hover:text-sky-400"
              onClick={() => openUrl(twitterUrl)}
            >
              <Twitter size={16} className="mr-1" />
              Twitter
            </Button>
          )}
          
          {linkedinUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-morphism bg-white/5 border-white/10 hover:border-white/20 hover:text-blue-500"
              onClick={() => openUrl(linkedinUrl)}
            >
              <Linkedin size={16} className="mr-1" />
              LinkedIn
            </Button>
          )}
          
          {websiteUrl && (
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-morphism bg-white/5 border-white/10 hover:border-white/20 hover:text-emerald-400"
              onClick={() => openUrl(websiteUrl)}
            >
              <Globe size={16} className="mr-1" />
              Website
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto"
            onClick={copyAuthorProfile}
          >
            {copied ? "Copied!" : "Copy Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostAuthor;
