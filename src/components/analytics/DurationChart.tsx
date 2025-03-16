
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DurationChartProps {
  data: Array<{ date: string; value: number }>;
  loading: boolean;
}

const DurationChart = ({ data, loading }: DurationChartProps) => {
  return (
    <Card className="glass-morphism border-white/10 bg-white/5">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-6">Average Session Duration (seconds)</h3>
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-white/60">Loading chart data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorDuration" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#4B5563',
                  color: '#F9FAFB' 
                }}
                formatter={(value: number) => {
                  const minutes = Math.floor(value / 60);
                  const seconds = value % 60;
                  return [`${minutes}m ${seconds}s`, 'Duration'];
                }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorDuration)" 
                name="Duration"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default DurationChart;
