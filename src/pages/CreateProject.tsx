
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock templates data - would be fetched from API in production
const templates = [
  {
    id: 'moon-coin',
    name: 'Moon Coin',
    description: 'Perfect for meme coins with bold, playful design.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
    category: 'meme-coin',
    isPro: false,
  },
  {
    id: 'defi-pro',
    name: 'DeFi Pro',
    description: 'Sophisticated design for DeFi protocols and platforms.',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop',
    category: 'defi',
    isPro: true,
  },
  {
    id: 'nft-showcase',
    name: 'NFT Showcase',
    description: 'Gallery-style layout for NFT collections and marketplaces.',
    image: 'https://images.unsplash.com/photo-1634986666676-ec9e2369d83c?q=80&w=2832&auto=format&fit=crop',
    category: 'nft',
    isPro: true,
  },
];

const CreateProject = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // Get template ID from URL if provided
  const initialTemplateId = searchParams.get('template');
  
  // State
  const [step, setStep] = useState(initialTemplateId ? 2 : 1);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(initialTemplateId);
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStep(2);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleCreateProject = () => {
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      toast({
        title: "Project Created",
        description: "Your new website project has been created successfully.",
      });
      navigate('/dashboard/edit/new-project');
    }, 1500);
  };
  
  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Create New Website</h1>
              <p className="text-white/70 text-lg">
                Build your Web3 website in minutes using our AI-powered tools
              </p>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12 animate-fade-in animate-delay-100">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-primary' : 'bg-white/10'
                }`}>
                  <span className="text-white font-medium">1</span>
                </div>
                <div className={`w-20 h-1 ${
                  step >= 2 ? 'bg-primary' : 'bg-white/10'
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-primary' : 'bg-white/10'
                }`}>
                  <span className="text-white font-medium">2</span>
                </div>
                <div className={`w-20 h-1 ${
                  step >= 3 ? 'bg-primary' : 'bg-white/10'
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-primary' : 'bg-white/10'
                }`}>
                  <span className="text-white font-medium">3</span>
                </div>
              </div>
            </div>
            
            {/* Step 1: Choose Template */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in animate-delay-200">
                <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card 
                      key={template.id}
                      className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                        selectedTemplate === template.id 
                          ? 'border-primary' 
                          : 'border-white/10 glass-morphism'
                      }`}
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <div className="relative aspect-[16/10]">
                        <img 
                          src={template.image} 
                          alt={template.name} 
                          className="w-full h-full object-cover"
                        />
                        {template.isPro && (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-primary rounded text-xs font-semibold">
                            PRO
                          </div>
                        )}
                        {selectedTemplate === template.id && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <Check size={40} className="text-primary" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <p className="text-white/70 text-sm">{template.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button 
                    onClick={() => selectedTemplate && setStep(2)}
                    disabled={!selectedTemplate}
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center">
                      Continue
                      <ArrowRight size={16} className="ml-2" />
                    </span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Project Details */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6 md:order-2">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input 
                        id="projectName"
                        placeholder="Enter website name" 
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="glass-morphism bg-white/5 border-white/10 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="projectDesc">Description</Label>
                      <Input 
                        id="projectDesc"
                        placeholder="Brief description of your website" 
                        value={projectDesc}
                        onChange={(e) => setProjectDesc(e.target.value)}
                        className="glass-morphism bg-white/5 border-white/10 mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label>Template</Label>
                      <div className="glass-morphism bg-white/5 border border-white/10 rounded-md p-4 mt-1">
                        <div className="flex items-center">
                          <div className="w-16 h-16 rounded overflow-hidden">
                            <img 
                              src={selectedTemplateData?.image} 
                              alt={selectedTemplateData?.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">{selectedTemplateData?.name}</h3>
                            <p className="text-white/60 text-sm">{selectedTemplateData?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-morphism bg-white/5 border border-white/10 rounded-lg p-6 md:order-1">
                    <h3 className="font-medium mb-4">Template Preview</h3>
                    <div className="aspect-[9/16] rounded overflow-hidden">
                      <img 
                        src={selectedTemplateData?.image} 
                        alt={selectedTemplateData?.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                    className="glass-morphism border-white/10 hover:bg-white/5"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                  
                  <Button 
                    onClick={() => setStep(3)}
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative flex items-center">
                      Continue
                      <ArrowRight size={16} className="ml-2" />
                    </span>
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Ready to Create</h2>
                
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{projectName || "Your New Website"}</h3>
                    <p className="text-white/70 mb-6">{projectDesc || "A Web3 website built with Reham."}</p>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <span className="text-white/60 w-32">Template:</span>
                        <span>{selectedTemplateData?.name}</span>
                      </div>
                      <div className="flex">
                        <span className="text-white/60 w-32">URL:</span>
                        <span>app.reham.org/{(projectName || "your-website").toLowerCase().replace(/\s+/g, '-')}</span>
                      </div>
                      <div className="flex">
                        <span className="text-white/60 w-32">Blockchain:</span>
                        <span>Solana</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center p-6 glass-morphism rounded-lg border border-white/10">
                  <h3 className="text-lg font-medium mb-2">Ready to launch your Web3 website?</h3>
                  <p className="text-white/70 mb-6">
                    Your website will be created and ready to customize in a few moments.
                  </p>
                  
                  <Button 
                    onClick={handleCreateProject}
                    disabled={isCreating}
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">
                      {isCreating ? "Creating..." : "Create My Website"}
                    </span>
                  </Button>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                    disabled={isCreating}
                    className="glass-morphism border-white/10 hover:bg-white/5"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProject;
