
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VisitorsChart from './VisitorsChart';
import PageViewsChart from './PageViewsChart';
import BounceRateChart from './BounceRateChart';
import DurationChart from './DurationChart';

interface AnalyticsTabsProps {
  data: {
    visitors: Array<{ date: string; value: number }>;
    pageViews: Array<{ date: string; value: number }>;
    bounceRate: Array<{ date: string; value: number }>;
    duration: Array<{ date: string; value: number }>;
  };
  loading: boolean;
}

const AnalyticsTabs = ({ data, loading }: AnalyticsTabsProps) => {
  return (
    <Tabs defaultValue="visitors" className="w-full">
      <TabsList className="glass-morphism bg-background/50 border border-white/10">
        <TabsTrigger value="visitors" className="data-[state=active]:bg-white/10">
          Visitors
        </TabsTrigger>
        <TabsTrigger value="pageViews" className="data-[state=active]:bg-white/10">
          Page Views
        </TabsTrigger>
        <TabsTrigger value="bounceRate" className="data-[state=active]:bg-white/10">
          Bounce Rate
        </TabsTrigger>
        <TabsTrigger value="duration" className="data-[state=active]:bg-white/10">
          Session Duration
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="visitors" className="mt-6">
        <VisitorsChart data={data.visitors} loading={loading} />
      </TabsContent>
      
      <TabsContent value="pageViews" className="mt-6">
        <PageViewsChart data={data.pageViews} loading={loading} />
      </TabsContent>
      
      <TabsContent value="bounceRate" className="mt-6">
        <BounceRateChart data={data.bounceRate} loading={loading} />
      </TabsContent>
      
      <TabsContent value="duration" className="mt-6">
        <DurationChart data={data.duration} loading={loading} />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
