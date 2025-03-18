
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const CreateProjectButton = () => {
  return (
    <div className="mb-10 animate-fade-in animate-delay-100 flex justify-end">
      <Link to="/dashboard/create">
        <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-xl transition-all duration-300">
          <span className="relative flex items-center z-10">
            <Plus size={16} className="mr-2 transition-transform group-hover:rotate-90 duration-300" />
            Create New Website
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0"></div>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Button>
      </Link>
    </div>
  );
};

export default CreateProjectButton;
