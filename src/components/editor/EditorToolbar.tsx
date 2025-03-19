
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Save, Undo, Redo, Eye, Code, Settings, ChevronDown, LayoutGrid, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface EditorToolbarProps {
  onSave: () => void;
  onPreview: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  viewMode: 'visual' | 'code';
  onViewModeChange: (mode: 'visual' | 'code') => void;
  projectTitle?: string;
}

const EditorToolbar = ({
  onSave,
  onPreview,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  viewMode,
  onViewModeChange,
  projectTitle = "Untitled Project"
}: EditorToolbarProps) => {
  const { toast } = useToast();

  const handleSave = () => {
    onSave();
    toast({
      title: "Changes Saved",
      description: "Your project has been saved successfully.",
    });
  };

  return (
    <div className="flex items-center justify-between p-2 border-b border-white/10 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <Link to="/dashboard">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleSave}
          className="flex items-center"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onUndo}
          disabled={!canUndo}
          className="flex items-center"
        >
          <Undo className="w-4 h-4 mr-2" />
          Undo
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onRedo}
          disabled={!canRedo}
          className="flex items-center"
        >
          <Redo className="w-4 h-4 mr-2" />
          Redo
        </Button>
      </div>
      
      <div className="text-sm font-medium">{projectTitle}</div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant={viewMode === 'visual' ? 'secondary' : 'ghost'} 
          size="sm" 
          onClick={() => onViewModeChange('visual')} 
          className="flex items-center"
        >
          <LayoutGrid className="w-4 h-4 mr-2" />
          Visual
        </Button>
        
        <Button 
          variant={viewMode === 'code' ? 'secondary' : 'ghost'} 
          size="sm" 
          onClick={() => onViewModeChange('code')}
          className="flex items-center"
        >
          <Code className="w-4 h-4 mr-2" />
          Code
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center">
              <Settings className="w-4 h-4 mr-2" />
              Settings
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Project Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>General</DropdownMenuItem>
            <DropdownMenuItem>SEO</DropdownMenuItem>
            <DropdownMenuItem>Analytics</DropdownMenuItem>
            <DropdownMenuItem>Custom Domain</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={onPreview}
          className="flex items-center bg-primary"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
