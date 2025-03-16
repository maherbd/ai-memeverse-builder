
import StatCard from './StatCard';
import { Users, MousePointerClick, Share2, Clock } from 'lucide-react';

interface StatsOverviewProps {
  stats: {
    visitors: number;
    change: number;
    pageViews: number;
    pageViewsChange: number;
    bounceRate: number;
    bounceRateChange: number;
    avgDuration: string;
    avgDurationChange: number;
  };
  loading: boolean;
}

const StatsOverview = ({ stats, loading }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in animate-delay-200">
      <StatCard
        title="Visitors"
        value={stats.visitors.toLocaleString()}
        change={stats.change}
        icon={<Users size={16} className="text-white/60 mr-2" />}
        loading={loading}
      />
      
      <StatCard
        title="Page Views"
        value={stats.pageViews.toLocaleString()}
        change={stats.pageViewsChange}
        icon={<MousePointerClick size={16} className="text-white/60 mr-2" />}
        loading={loading}
      />
      
      <StatCard
        title="Bounce Rate"
        value={`${stats.bounceRate}%`}
        change={stats.bounceRateChange}
        icon={<Share2 size={16} className="text-white/60 mr-2" />}
        loading={loading}
        isInverted={true}
      />
      
      <StatCard
        title="Avg. Duration"
        value={stats.avgDuration}
        change={stats.avgDurationChange}
        icon={<Clock size={16} className="text-white/60 mr-2" />}
        loading={loading}
      />
    </div>
  );
};

export default StatsOverview;
