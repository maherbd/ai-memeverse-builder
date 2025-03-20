
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, ExternalLink, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import EditorCanvas from "./EditorCanvas";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProjectPreviewProps {
  projectTitle: string;
  onExitPreview: () => void;
}

const ProjectPreview = ({ projectTitle, onExitPreview }: ProjectPreviewProps) => {
  const { toast } = useToast();
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isCopied, setIsCopied] = useState(false);

  const handleShareProject = () => {
    // Copy a shareable link to clipboard
    const shareableLink = `https://app.reham.org/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(shareableLink);
    
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    
    toast({
      title: "Link Copied",
      description: "A shareable preview link has been copied to your clipboard.",
    });
  };

  const getPreviewWidth = () => {
    switch (viewportSize) {
      case 'mobile': return 'max-w-[375px]';
      case 'tablet': return 'max-w-[768px]';
      case 'desktop': return 'max-w-4xl';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-white/10 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={onExitPreview} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Editor
          </Button>
        </div>
        <div className="text-sm font-medium">{projectTitle} - Preview Mode</div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md overflow-hidden border border-white/10">
            <Button 
              size="sm" 
              variant={viewportSize === 'desktop' ? 'secondary' : 'ghost'} 
              className="px-3 rounded-none"
              onClick={() => setViewportSize('desktop')}
            >
              Desktop
            </Button>
            <Button 
              size="sm" 
              variant={viewportSize === 'tablet' ? 'secondary' : 'ghost'} 
              className="px-3 rounded-none"
              onClick={() => setViewportSize('tablet')}
            >
              Tablet
            </Button>
            <Button 
              size="sm" 
              variant={viewportSize === 'mobile' ? 'secondary' : 'ghost'} 
              className="px-3 rounded-none"
              onClick={() => setViewportSize('mobile')}
            >
              Mobile
            </Button>
          </div>
          
          <TooltipProvider>
            <Tooltip open={isCopied}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={handleShareProject} className="flex items-center">
                  {isCopied ? <Copy className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
                  {isCopied ? "Copied!" : "Share"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Link copied!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Link to="/dashboard" className="ml-2">
            <Button variant="ghost" size="sm" className="flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Exit Preview
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 bg-gray-900/50">
        <div className={`mx-auto border border-white/10 rounded-md overflow-hidden glass-morphism transition-all duration-300 ${getPreviewWidth()}`}>
          <div className="h-8 border-b border-white/10 bg-background/80 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs mx-auto text-white/60">
              {`https://app.reham.org/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`}
            </div>
          </div>
          <div className="preview-container p-4">
            <EditorCanvas viewMode="visual" isPreview={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
