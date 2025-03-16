
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, ExternalLink, Edit, Trash2, Copy, Eye, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Placeholder component when user is not connected
const NotConnected = () => {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center glass-morphism rounded-xl border border-white/10 p-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gradient">Connect Your Wallet</h2>
      <p className="text-white/70 text-center max-w-md mb-6">
        Please connect your wallet to access the dashboard and manage your websites.
      </p>
      <Button size="lg" className="group relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative flex items-center">
          Connect Wallet
        </span>
      </Button>
    </div>
  );
};

// Project card component
interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  domain: string;
  createdAt: string;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ id, name, description, image, domain, createdAt, onDelete }: ProjectCardProps) => {
  const { toast } = useToast();
  
  const copyDomain = () => {
    navigator.clipboard.writeText(domain);
    toast({
      title: "Domain Copied",
      description: "The domain has been copied to your clipboard.",
    });
  };
  
  return (
    <div className="glass-morphism rounded-xl border border-white/10 overflow-hidden animate-on-scroll opacity-0">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <h3 className="font-bold text-xl">{name}</h3>
          <span className="text-xs text-white/60">Created {createdAt}</span>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-white/60 text-xs mr-2">Domain:</span>
          <a 
            href={`https://${domain}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary text-sm hover:underline flex items-center"
          >
            {domain}
            <ExternalLink size={12} className="ml-1" />
          </a>
          <button
            onClick={copyDomain}
            className="ml-auto text-white/60 hover:text-white p-1 transition-colors"
            aria-label="Copy domain"
          >
            <Copy size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <Link to={`/dashboard/edit/${id}`}>
              <Edit size={14} className="mr-1" />
              Edit
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <Link to={`/dashboard/analytics/${id}`}>
              <BarChart3 size={14} className="mr-1" />
              Stats
            </Link>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="glass-morphism border-white/10 hover:bg-white/5"
            asChild
          >
            <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
              <Eye size={14} className="mr-1" />
              View
            </a>
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            className="col-span-3 mt-2"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={14} className="mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(true); // Set to true to show dashboard content
  
  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: 'project-1',
      name: 'Moon Coin',
      description: 'The next generation meme token with utility.',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2832&auto=format&fit=crop',
      domain: 'app.reham.org/moon-coin',
      createdAt: '2 days ago',
    },
    {
      id: 'project-2',
      name: 'Crypto Startup',
      description: 'Web3 startup focused on blockchain innovations.',
      image: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2940&auto=format&fit=crop',
      domain: 'app.reham.org/crypto-startup',
      createdAt: '1 week ago',
    },
  ]);
  
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted.",
    });
  };
  
  if (!isConnected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Dashboard</h1>
              <p className="text-white/70 text-lg">
                Manage your Web3 websites and view analytics
              </p>
            </div>
            
            <NotConnected />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Dashboard</h1>
            <p className="text-white/70 text-lg">
              Manage your Web3 websites and view analytics
            </p>
          </div>
          
          {/* Create New Project Button */}
          <div className="mb-10 animate-fade-in animate-delay-100 flex justify-end">
            <Link to="/dashboard/create">
              <Button className="group relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Plus size={16} className="mr-2" />
                  Create New Website
                </span>
              </Button>
            </Link>
          </div>
          
          {/* Projects Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  image={project.image}
                  domain={project.domain}
                  createdAt={project.createdAt}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 glass-morphism rounded-xl border border-white/10 animate-fade-in animate-delay-200">
              <h3 className="text-xl font-semibold mb-3">No Projects Yet</h3>
              <p className="text-white/70 mb-6">Let's create your first Web3 website!</p>
              <Link to="/dashboard/create">
                <Button className="group relative overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center">
                    <Plus size={16} className="mr-2" />
                    Create New Website
                  </span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
