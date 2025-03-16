
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Globe } from 'lucide-react';

interface ProjectHeaderProps {
  projectId: string;
  projectName: string;
  domain: string;
}

const ProjectHeader = ({ projectId, projectName, domain }: ProjectHeaderProps) => {
  return (
    <>
      <div className="flex items-center mb-8 animate-fade-in">
        <Link to="/dashboard">
          <Button 
            variant="ghost" 
            size="sm"
            className="mr-4"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gradient">{projectName}</h1>
        <span className="text-white/60 text-sm ml-4 mt-1">Analytics</span>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in animate-delay-100">
        <div>
          <div className="flex items-center">
            <Globe size={16} className="text-white/60 mr-2" />
            <a 
              href={`https://${domain}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {domain}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectHeader;
