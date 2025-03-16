
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PageViewsChartProps {
  data: Array<{ date: string; value: number }>;
  loading: boolean;
}

const PageViewsChart = ({ data, loading }: PageViewsChartProps) => {
  return (
    <Card className="glass-morphism border-white/10 bg-white/5">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-6">Page Views Over Time</h3>
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-white/60">Loading chart data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#4B5563',
                  color: '#F9FAFB' 
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366F1" 
                strokeWidth={2}
                name="Page Views"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PageViewsChart;
