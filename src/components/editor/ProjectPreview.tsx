
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import EditorCanvas from "./EditorCanvas";

interface ProjectPreviewProps {
  projectTitle: string;
  onExitPreview: () => void;
}

const ProjectPreview = ({ projectTitle, onExitPreview }: ProjectPreviewProps) => {
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
        <div className="flex items-center">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Exit Preview</Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto border border-white/10 rounded-md p-4 glass-morphism">
          <EditorCanvas viewMode="visual" isPreview={true} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
