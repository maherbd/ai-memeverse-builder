
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BounceRateChartProps {
  data: Array<{ date: string; value: number }>;
  loading: boolean;
}

const BounceRateChart = ({ data, loading }: BounceRateChartProps) => {
  return (
    <Card className="glass-morphism border-white/10 bg-white/5">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-6">Bounce Rate (%)</h3>
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-white/60">Loading chart data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
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
                formatter={(value) => [`${value}%`, 'Bounce Rate']}
              />
              <Bar 
                dataKey="value" 
                fill="#EC4899" 
                name="Bounce Rate" 
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default BounceRateChart;
