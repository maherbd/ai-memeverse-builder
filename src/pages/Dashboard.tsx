
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { useToast } from '@/hooks/use-toast';
import NotConnected from '@/components/dashboard/NotConnected';
import ProjectsGrid from '@/components/dashboard/ProjectsGrid';
import CreateProjectButton from '@/components/dashboard/CreateProjectButton';

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
          
          <CreateProjectButton />
          <ProjectsGrid projects={projects} onDeleteProject={handleDeleteProject} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
