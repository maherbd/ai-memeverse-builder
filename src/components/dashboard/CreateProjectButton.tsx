
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const CreateProjectButton = () => {
  return (
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
  );
};

export default CreateProjectButton;
