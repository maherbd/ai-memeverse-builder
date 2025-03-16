
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid z-0"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center glass-morphism p-10 rounded-2xl border border-white/10 max-w-md w-full animate-scale-in">
        <h1 className="text-7xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-2xl text-white mb-2">Page Not Found</p>
        <p className="text-white/60 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="default" 
            onClick={() => window.history.back()}
            className="group relative overflow-hidden w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </span>
          </Button>
          
          <Button 
            variant="outline" 
            className="glass-morphism border-white/10 hover:bg-white/5 w-full sm:w-auto"
            asChild
          >
            <Link to="/">
              <Home size={16} className="mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
