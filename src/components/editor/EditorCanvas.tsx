
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface EditorCanvasProps {
  viewMode: 'visual' | 'code';
  isPreview?: boolean;
}

const EditorCanvas = ({ viewMode, isPreview = false }: EditorCanvasProps) => {
  const { toast } = useToast();
  const [dropTargets, setDropTargets] = useState<string[]>([]);

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

  const renderComponent = (componentId: string, index: number) => {
    // This is a simplified version, in a real app you'd render actual components
    return (
      <Card 
        key={index}
        className="p-4 mb-4 border border-white/10 glass-morphism"
      >
        <div className="text-sm font-medium">{componentId}</div>
        <div className="text-xs text-muted-foreground">Component placeholder</div>
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
          className="min-h-[calc(100vh-100px)] border-2 border-dashed border-white/20 rounded-md p-6"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {dropTargets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <p>Drag and drop components here</p>
              <p className="text-xs mt-2">or select a component from the library</p>
            </div>
          ) : (
            <div>
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
