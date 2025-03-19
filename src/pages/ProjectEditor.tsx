
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorToolbar from '@/components/editor/EditorToolbar';
import ComponentLibrary from '@/components/editor/ComponentLibrary';
import EditorCanvas from '@/components/editor/EditorCanvas';
import { useToast } from '@/hooks/use-toast';

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Editor state
  const [viewMode, setViewMode] = useState<'visual' | 'code'>('visual');
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulating loading project data
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCanUndo(true); // Just for demo
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving project:', id);
  };
  
  const handlePreview = () => {
    // Navigate to preview mode
    toast({
      title: "Preview Mode",
      description: "Viewing your site as visitors will see it.",
    });
  };
  
  const handleUndo = () => {
    toast({
      description: "Undo successful",
    });
    setCanRedo(true);
  };
  
  const handleRedo = () => {
    toast({
      description: "Redo successful",
    });
  };
  
  const handleDragStart = (componentId: string) => {
    // Set data for drag operation
    const event = window.event as DragEvent;
    if (event.dataTransfer) {
      event.dataTransfer.setData('componentId', componentId);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-primary border-white/10 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold">Loading Project...</h3>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <EditorToolbar 
        onSave={handleSave}
        onPreview={handlePreview}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ComponentLibrary onDragStart={handleDragStart} />
        <EditorCanvas viewMode={viewMode} />
      </div>
    </div>
  );
};

export default ProjectEditor;
