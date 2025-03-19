
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define component categories and their items
const components = {
  layout: [
    { id: "section", name: "Section", icon: "□" },
    { id: "container", name: "Container", icon: "▣" },
    { id: "grid", name: "Grid", icon: "▦" },
    { id: "columns", name: "Columns", icon: "▤" },
  ],
  elements: [
    { id: "heading", name: "Heading", icon: "H" },
    { id: "paragraph", name: "Paragraph", icon: "¶" },
    { id: "button", name: "Button", icon: "⏺" },
    { id: "image", name: "Image", icon: "🖼" },
    { id: "divider", name: "Divider", icon: "—" },
  ],
  web3: [
    { id: "connect-wallet", name: "Connect Wallet", icon: "🔌" },
    { id: "token-price", name: "Token Price", icon: "💰" },
    { id: "nft-gallery", name: "NFT Gallery", icon: "🖼" },
    { id: "roadmap", name: "Roadmap", icon: "🗺" },
  ],
};

interface ComponentLibraryProps {
  onDragStart: (component: string) => void;
}

const ComponentLibrary = ({ onDragStart }: ComponentLibraryProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterComponents = (items: { id: string; name: string; icon: string }[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="w-64 border-r border-white/10 bg-background/50 p-4 h-full">
      <h3 className="font-medium mb-4">Components</h3>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search components..."
          className="pl-8 glass-morphism bg-white/5 border-white/10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="layout">
        <TabsList className="w-full grid grid-cols-3 mb-4 glass-morphism bg-background/50 border border-white/10">
          <TabsTrigger value="layout" className="text-xs">Layout</TabsTrigger>
          <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
          <TabsTrigger value="web3" className="text-xs">Web3</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-[calc(100vh-220px)]">
          <TabsContent value="layout" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterComponents(components.layout).map((component) => (
                <div
                  key={component.id}
                  className="p-2 border border-white/10 rounded-md text-center cursor-grab glass-morphism hover:border-primary/40 transition-colors"
                  draggable
                  onDragStart={() => onDragStart(component.id)}
                >
                  <div className="text-xl mb-1">{component.icon}</div>
                  <div className="text-xs">{component.name}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="elements" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterComponents(components.elements).map((component) => (
                <div
                  key={component.id}
                  className="p-2 border border-white/10 rounded-md text-center cursor-grab glass-morphism hover:border-primary/40 transition-colors"
                  draggable
                  onDragStart={() => onDragStart(component.id)}
                >
                  <div className="text-xl mb-1">{component.icon}</div>
                  <div className="text-xs">{component.name}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="web3" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterComponents(components.web3).map((component) => (
                <div
                  key={component.id}
                  className="p-2 border border-white/10 rounded-md text-center cursor-grab glass-morphism hover:border-primary/40 transition-colors"
                  draggable
                  onDragStart={() => onDragStart(component.id)}
                >
                  <div className="text-xl mb-1">{component.icon}</div>
                  <div className="text-xs">{component.name}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default ComponentLibrary;
