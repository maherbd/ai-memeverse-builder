
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Globe, 
  PanelLeft, 
  PanelRight, 
  LayoutGrid, 
  Palette, 
  Settings, 
  Image, 
  Type, 
  Link as LinkIcon,
  Eye,
  ChevronLeft
} from 'lucide-react';

// Mock template data
const template = {
  id: 'moon-coin',
  name: 'Moon Coin',
  sections: [
    { id: 'hero', name: 'Hero', active: true },
    { id: 'about', name: 'About', active: true },
    { id: 'tokenomics', name: 'Tokenomics', active: true },
    { id: 'roadmap', name: 'Roadmap', active: true },
    { id: 'how-to-buy', name: 'How to Buy', active: true },
    { id: 'team', name: 'Team', active: false },
    { id: 'faq', name: 'FAQ', active: true },
    { id: 'community', name: 'Community', active: true },
  ],
  settings: {
    colors: {
      primary: '#3B82F6',
      secondary: '#6366F1',
      background: '#0F172A',
      text: '#FFFFFF',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    }
  }
};

const ProjectEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // State
  const [activeTab, setActiveTab] = useState('content');
  const [projectName, setProjectName] = useState('Moon Coin');
  const [projectDescription, setProjectDescription] = useState('The next generation meme token with utility.');
  const [sections, setSections] = useState(template.sections);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSaveProject = () => {
    toast({
      title: "Project Saved",
      description: "Your changes have been saved successfully.",
    });
  };
  
  const handleToggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, active: !section.active } 
        : section
    ));
  };
  
  const handlePreviewToggle = () => {
    setPreviewMode(!previewMode);
    
    if (!previewMode) {
      toast({
        title: "Preview Mode",
        description: "Now viewing how your website will look to visitors.",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {/* Editor Toolbar */}
        <div className="border-b border-white/10 bg-background/80 backdrop-blur-lg fixed top-16 left-0 right-0 z-40">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </Button>
              <span className="text-lg font-medium">{projectName || 'Untitled Project'}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="glass-morphism border-white/10 hover:bg-white/5"
                onClick={handlePreviewToggle}
              >
                <Eye size={16} className="mr-1" />
                {previewMode ? 'Exit Preview' : 'Preview'}
              </Button>
              
              <Button size="sm" onClick={handleSaveProject}>
                <Save size={16} className="mr-1" />
                Save
              </Button>
            </div>
          </div>
        </div>
        
        <div className="pt-16 min-h-[calc(100vh-64px-64px)] flex">
          {/* Sidebar */}
          {!previewMode && (
            <div className={`border-r border-white/10 bg-background/80 backdrop-blur-lg h-[calc(100vh-64px-64px)] fixed top-32 bottom-0 overflow-y-auto transition-all duration-300 ${
              isSidebarCollapsed ? 'w-16' : 'w-64'
            }`}>
              <div className="p-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start mb-4"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                >
                  {isSidebarCollapsed ? <PanelRight size={16} /> : <>
                    <PanelLeft size={16} className="mr-2" />
                    {!isSidebarCollapsed && <span>Collapse</span>}
                  </>}
                </Button>
                
                {!isSidebarCollapsed && (
                  <div className="space-y-4">
                    <div>
                      <Label>Project Name</Label>
                      <Input 
                        value={projectName} 
                        onChange={(e) => setProjectName(e.target.value)}
                        className="glass-morphism bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea 
                        value={projectDescription} 
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="glass-morphism bg-white/5 border-white/10"
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-white/10">
                      <h3 className="font-medium mb-2">Page Sections</h3>
                      <div className="space-y-2">
                        {sections.map((section) => (
                          <div key={section.id} className="flex items-center justify-between">
                            <span>{section.name}</span>
                            <Switch 
                              checked={section.active} 
                              onCheckedChange={() => handleToggleSection(section.id)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Main Content Area */}
          <div className={`transition-all duration-300 ${
            previewMode 
              ? 'ml-0 w-full' 
              : isSidebarCollapsed 
              ? 'ml-16 w-[calc(100%-4rem)]' 
              : 'ml-64 w-[calc(100%-16rem)]'
          }`}>
            {previewMode ? (
              // Preview Frame
              <div className="p-6">
                <div className="w-full border border-white/10 rounded-lg overflow-hidden h-[calc(100vh-64px-64px-48px)]">
                  <div className="w-full h-12 glass-morphism border-b border-white/10 flex items-center px-4">
                    <Globe size={16} className="text-white/60 mr-2" />
                    <span className="text-white/60 text-sm">app.reham.org/{projectName.toLowerCase().replace(/\s+/g, '-')}</span>
                  </div>
                  <div className="w-full h-[calc(100%-3rem)] bg-black/20 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">{projectName}</h2>
                      <p className="text-white/60 mb-4">{projectDescription}</p>
                      <div className="space-y-4">
                        {sections.filter(s => s.active).map(section => (
                          <div key={section.id} className="p-4 border border-white/10 rounded-md">
                            <h3 className="font-medium">{section.name} Section</h3>
                            <p className="text-white/60 text-sm">Content for {section.name} will appear here</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Editor Interface
              <div className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="glass-morphism bg-background/50 border border-white/10">
                    <TabsTrigger value="content" className="data-[state=active]:bg-white/10">
                      <LayoutGrid size={16} className="mr-1" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="design" className="data-[state=active]:bg-white/10">
                      <Palette size={16} className="mr-1" />
                      Design
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-white/10">
                      <Settings size={16} className="mr-1" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {sections.filter(s => s.active).map(section => (
                        <Card key={section.id} className="glass-morphism border-white/10 bg-white/5">
                          <CardContent className="p-6">
                            <h3 className="text-lg font-medium mb-4">{section.name} Section</h3>
                            
                            {/* Section content editor - simplified for demo */}
                            <div className="space-y-4">
                              <div>
                                <Label>Heading</Label>
                                <Input 
                                  placeholder={`${section.name} heading`} 
                                  className="glass-morphism bg-white/5 border-white/10"
                                />
                              </div>
                              
                              <div>
                                <Label>Content</Label>
                                <Textarea 
                                  placeholder={`Enter content for ${section.name} section`}
                                  className="glass-morphism bg-white/5 border-white/10"
                                  rows={4}
                                />
                              </div>
                              
                              <div>
                                <Label className="block mb-2">Media</Label>
                                <Button variant="outline" size="sm" className="glass-morphism border-white/10 hover:bg-white/5">
                                  <Image size={16} className="mr-1" />
                                  Add Image
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="design" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="glass-morphism border-white/10 bg-white/5">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Colors</h3>
                          <div className="space-y-4">
                            <div>
                              <Label>Primary Color</Label>
                              <div className="flex mt-1">
                                <div 
                                  className="w-10 h-10 rounded-l-md border border-white/10" 
                                  style={{ backgroundColor: template.settings.colors.primary }}
                                ></div>
                                <Input 
                                  value={template.settings.colors.primary}
                                  className="rounded-l-none glass-morphism bg-white/5 border-white/10"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label>Secondary Color</Label>
                              <div className="flex mt-1">
                                <div 
                                  className="w-10 h-10 rounded-l-md border border-white/10" 
                                  style={{ backgroundColor: template.settings.colors.secondary }}
                                ></div>
                                <Input 
                                  value={template.settings.colors.secondary}
                                  className="rounded-l-none glass-morphism bg-white/5 border-white/10"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-morphism border-white/10 bg-white/5">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Typography</h3>
                          <div className="space-y-4">
                            <div>
                              <Label>Heading Font</Label>
                              <Input 
                                value={template.settings.fonts.heading}
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                            </div>
                            
                            <div>
                              <Label>Body Font</Label>
                              <Input 
                                value={template.settings.fonts.body}
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-morphism border-white/10 bg-white/5">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Animations</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Fade-in Animations</span>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Parallax Effects</span>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Background Animation</span>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="glass-morphism border-white/10 bg-white/5">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Domain Settings</h3>
                          <div className="space-y-4">
                            <div>
                              <Label>Subdomain</Label>
                              <div className="flex">
                                <Input 
                                  value={projectName.toLowerCase().replace(/\s+/g, '-')}
                                  onChange={(e) => setProjectName(e.target.value.replace(/\s+/g, '-'))}
                                  className="rounded-r-none glass-morphism bg-white/5 border-white/10"
                                />
                                <div className="px-3 py-2 rounded-r-md border border-l-0 border-white/10 bg-white/5 flex items-center">
                                  <span className="text-white/60">.app.reham.org</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <Label className="flex items-center">
                                <span className="mr-2">Custom Domain</span>
                                <span className="text-xs py-0.5 px-2 bg-primary rounded">PRO</span>
                              </Label>
                              <div className="flex mt-1">
                                <Input 
                                  placeholder="yourwebsite.com"
                                  disabled
                                  className="glass-morphism bg-white/5 border-white/10"
                                />
                                <Button className="ml-2" disabled>Connect</Button>
                              </div>
                              <p className="text-xs text-white/60 mt-1">Upgrade to PRO to use custom domains</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-morphism border-white/10 bg-white/5">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Social Links</h3>
                          <div className="space-y-4">
                            <div>
                              <Label>Twitter / X</Label>
                              <div className="flex mt-1">
                                <div className="px-2 py-2 rounded-l-md border border-r-0 border-white/10 bg-white/5 flex items-center">
                                  <span className="text-white/60">twitter.com/</span>
                                </div>
                                <Input 
                                  placeholder="username"
                                  className="rounded-l-none glass-morphism bg-white/5 border-white/10"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label>Telegram</Label>
                              <div className="flex mt-1">
                                <div className="px-2 py-2 rounded-l-md border border-r-0 border-white/10 bg-white/5 flex items-center">
                                  <span className="text-white/60">t.me/</span>
                                </div>
                                <Input 
                                  placeholder="username"
                                  className="rounded-l-none glass-morphism bg-white/5 border-white/10"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label>Website</Label>
                              <Input 
                                placeholder="https://yourwebsite.com"
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="glass-morphism border-white/10 bg-white/5 md:col-span-2">
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4">Web3 Integration</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Token Contract Address</Label>
                              <Input 
                                placeholder="0x..."
                                className="glass-morphism bg-white/5 border-white/10"
                              />
                              <p className="text-xs text-white/60 mt-1">Ethereum or Solana token address</p>
                            </div>
                            
                            <div>
                              <Label>Blockchain</Label>
                              <div className="grid grid-cols-2 gap-2 mt-1">
                                <Button variant="outline" className="glass-morphism border-white/10 hover:bg-white/5 justify-start">
                                  Ethereum
                                </Button>
                                <Button variant="outline" className="glass-morphism border-white/10 hover:bg-white/5 justify-start bg-white/10">
                                  Solana
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <Label>Price Chart Integration</Label>
                              <div className="flex items-center space-x-2 mt-1">
                                <Button variant="outline" size="sm" className="glass-morphism border-white/10 hover:bg-white/5">
                                  DexScreener
                                </Button>
                                <Button variant="outline" size="sm" className="glass-morphism border-white/10 hover:bg-white/5">
                                  DexTools
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <Label>Connect Wallet Button</Label>
                              <div className="flex items-center justify-between mt-1">
                                <span>Enable on website</span>
                                <Switch defaultChecked />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Only show footer in preview mode */}
      {previewMode && <Footer />}
    </div>
  );
};

export default ProjectEditor;
