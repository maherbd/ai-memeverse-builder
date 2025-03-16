
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: ReactNode;
  loading: boolean;
  isInverted?: boolean;
}

const StatCard = ({ title, value, change, icon, loading, isInverted = false }: StatCardProps) => {
  // For some metrics (like bounce rate), a negative change is good
  const isPositive = isInverted ? change < 0 : change >= 0;
  
  return (
    <Card className="glass-morphism border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-white/60">{title}</span>
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span className="text-sm ml-1">{Math.abs(change)}%</span>
          </div>
        </div>
        <div className="flex items-baseline">
          {icon}
          <div className="text-2xl font-bold">{loading ? '—' : value}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
