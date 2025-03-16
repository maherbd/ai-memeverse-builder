
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  domain: string;
  createdAt: string;
}

interface ProjectsGridProps {
  projects: Project[];
  onDeleteProject: (id: string) => void;
}

const ProjectsGrid = ({ projects, onDeleteProject }: ProjectsGridProps) => {
  if (projects.length === 0) {
    return (
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
    );
  }

  return (
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
          onDelete={onDeleteProject}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
