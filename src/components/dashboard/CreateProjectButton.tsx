
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const CreateProjectButton = () => {
  return (
    <div className="mb-10 animate-fade-in animate-delay-100 flex justify-end">
      <Link to="/dashboard/create">
        <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-shadow">
          <span className="relative flex items-center">
            <Plus size={16} className="mr-2" />
            Create New Website
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </Button>
      </Link>
    </div>
  );
};

export default CreateProjectButton;
