
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Trash2, Move, Edit, Copy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EditorCanvasProps {
  viewMode: 'visual' | 'code';
  isPreview?: boolean;
}

const EditorCanvas = ({ viewMode, isPreview = false }: EditorCanvasProps) => {
  const { toast } = useToast();
  const [dropTargets, setDropTargets] = useState<string[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<number | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentId = e.dataTransfer.getData("componentId");
    if (componentId) {
      setDropTargets([...dropTargets, componentId]);
      toast({
        title: "Component Added",
        description: `Added ${componentId} to the canvas.`,
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDeleteComponent = (index: number) => {
    const newComponents = [...dropTargets];
    const deletedComponent = newComponents[index];
    newComponents.splice(index, 1);
    setDropTargets(newComponents);
    setSelectedComponent(null);
    toast({
      title: "Component Removed",
      description: `${deletedComponent} has been removed from the canvas.`,
    });
  };

  const handleDuplicateComponent = (index: number) => {
    const componentToClone = dropTargets[index];
    const newComponents = [...dropTargets];
    newComponents.splice(index + 1, 0, componentToClone);
    setDropTargets(newComponents);
    toast({
      title: "Component Duplicated",
      description: `${componentToClone} has been duplicated.`,
    });
  };

  const renderComponent = (componentId: string, index: number) => {
    const isSelected = selectedComponent === index && !isPreview;
    
    return (
      <Card 
        key={index}
        className={`p-4 mb-4 border relative group ${
          isSelected 
            ? 'border-primary bg-primary/10' 
            : 'border-white/10 glass-morphism'
        }`}
        onClick={() => !isPreview && setSelectedComponent(index)}
      >
        {!isPreview && (
          <div className={`absolute top-2 right-2 flex gap-1 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-6 h-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicateComponent(index);
                    }}
                  >
                    <Copy className="w-3.5 h-3.5 text-white/70 hover:text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-6 h-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteComponent(index);
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5 text-white/70 hover:text-destructive" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        
        <div className="flex items-start gap-2">
          {!isPreview && (
            <div className="flex items-center justify-center h-7 w-7 bg-white/10 rounded text-white/70">
              <Move className="w-4 h-4" />
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium">{componentId}</div>
            <div className="text-xs text-muted-foreground mt-1">Component placeholder</div>
          </div>
        </div>
        
        {isSelected && !isPreview && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Info className="w-3.5 h-3.5" />
              <span>Select component properties to edit</span>
            </div>
          </div>
        )}
      </Card>
    );
  };

  // In preview mode, we render the components without the editing UI
  if (isPreview) {
    return (
      <div className="w-full">
        {dropTargets.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-medium mb-2">This project is empty</h3>
            <p className="text-white/60">Add components to see them in preview mode</p>
          </div>
        ) : (
          <div className="space-y-6">
            {dropTargets.map((componentId, index) => renderComponent(componentId, index))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 overflow-auto">
      {viewMode === 'visual' ? (
        <div 
          className={`min-h-[calc(100vh-100px)] border-2 border-dashed ${
            selectedComponent !== null ? 'border-primary/40' : 'border-white/20'
          } rounded-md p-6`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => setSelectedComponent(null)}
        >
          {dropTargets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Drag and drop components here</p>
              <p className="text-xs mt-2">or select a component from the library</p>
            </div>
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              {dropTargets.map((componentId, index) => renderComponent(componentId, index))}
            </div>
          )}
        </div>
      ) : (
        <div className="min-h-[calc(100vh-100px)] bg-background/90 rounded-md p-4">
          <pre className="text-sm glass-morphism p-4 rounded-md overflow-auto">
            <code className="text-green-400">
              {`// Generated code for your project
import React from 'react';
${dropTargets.map(comp => `import ${comp.charAt(0).toUpperCase() + comp.slice(1)} from './components/${comp}';\n`).join('')}              
const Homepage = () => {
  return (
    <div className="container mx-auto px-4">
      ${dropTargets.map(comp => `<${comp.charAt(0).toUpperCase() + comp.slice(1)} />\n      `).join('')}
    </div>
  );
};

export default Homepage;`}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default EditorCanvas;
