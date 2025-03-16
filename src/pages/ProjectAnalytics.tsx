
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ArrowUpRight, ArrowDownRight, Users, Globe, Clock, MousePointerClick, Share2 } from 'lucide-react';

// Mock data for charts
const generateDataForDays = (days: number, baseValue: number, variance: number) => {
  const now = new Date();
  const data = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
    
    // Random value within variance
    const randomFactor = Math.random() * variance * 2 - variance;
    const value = Math.max(0, Math.round(baseValue + randomFactor));
    
    data.push({
      date: formattedDate,
      value
    });
  }
  
  return data;
};

const visitorsData = generateDataForDays(30, 120, 50);
const pageViewsData = generateDataForDays(30, 350, 100);
const bounceRateData = generateDataForDays(30, 65, 15).map(item => ({
  ...item,
  value: Math.min(100, item.value) // Cap at 100%
}));
const durationData = generateDataForDays(30, 120, 30); // Duration in seconds

const ProjectAnalytics = () => {
  const { id } = useParams();
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // State
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  
  // Mock project data
  const project = {
    id: id,
    name: 'Moon Coin',
    domain: 'app.reham.org/moon-coin',
    stats: {
      visitors: 1243,
      change: 12.5, // percentage change
      pageViews: 3524,
      pageViewsChange: 8.3,
      bounceRate: 64.2,
      bounceRateChange: -3.1, // negative is good
      avgDuration: '1m 42s',
      avgDurationChange: 5.7,
    }
  };
  
  // Set different date ranges based on selection
  const getDataForRange = (range: string, data: any[]) => {
    switch (range) {
      case '7d':
        return data.slice(-7);
      case '14d':
        return data.slice(-14);
      case '30d':
        return data;
      default:
        return data;
    }
  };
  
  // Scroll to top on component mount and simulate loading
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8 animate-fade-in">
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                className="mr-4"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gradient">{project.name}</h1>
            <span className="text-white/60 text-sm ml-4 mt-1">Analytics</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fade-in animate-delay-100">
            <div>
              <div className="flex items-center">
                <Globe size={16} className="text-white/60 mr-2" />
                <a 
                  href={`https://${project.domain}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {project.domain}
                </a>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value)}>
                <ToggleGroupItem value="7d" aria-label="Last 7 days" className="glass-morphism border-white/10 hover:bg-white/5">
                  7D
                </ToggleGroupItem>
                <ToggleGroupItem value="14d" aria-label="Last 14 days" className="glass-morphism border-white/10 hover:bg-white/5">
                  14D
                </ToggleGroupItem>
                <ToggleGroupItem value="30d" aria-label="Last 30 days" className="glass-morphism border-white/10 hover:bg-white/5">
                  30D
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in animate-delay-200">
            <Card className="glass-morphism border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white/60">Visitors</span>
                  <div className={`flex items-center ${project.stats.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {project.stats.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span className="text-sm ml-1">{Math.abs(project.stats.change)}%</span>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <Users size={16} className="text-white/60 mr-2" />
                  <div className="text-2xl font-bold">{loading ? '—' : project.stats.visitors.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white/60">Page Views</span>
                  <div className={`flex items-center ${project.stats.pageViewsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {project.stats.pageViewsChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span className="text-sm ml-1">{Math.abs(project.stats.pageViewsChange)}%</span>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <MousePointerClick size={16} className="text-white/60 mr-2" />
                  <div className="text-2xl font-bold">{loading ? '—' : project.stats.pageViews.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white/60">Bounce Rate</span>
                  <div className={`flex items-center ${project.stats.bounceRateChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {project.stats.bounceRateChange < 0 ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                    <span className="text-sm ml-1">{Math.abs(project.stats.bounceRateChange)}%</span>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <Share2 size={16} className="text-white/60 mr-2" />
                  <div className="text-2xl font-bold">{loading ? '—' : `${project.stats.bounceRate}%`}</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-white/60">Avg. Duration</span>
                  <div className={`flex items-center ${project.stats.avgDurationChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {project.stats.avgDurationChange >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span className="text-sm ml-1">{Math.abs(project.stats.avgDurationChange)}%</span>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <Clock size={16} className="text-white/60 mr-2" />
                  <div className="text-2xl font-bold">{loading ? '—' : project.stats.avgDuration}</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="space-y-8 animate-fade-in animate-delay-300">
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
                <Card className="glass-morphism border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-6">Visitors Over Time</h3>
                    {loading ? (
                      <div className="h-[400px] flex items-center justify-center">
                        <div className="animate-pulse text-white/60">Loading chart data...</div>
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={400}>
                        <AreaChart
                          data={getDataForRange(timeRange, visitorsData)}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
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
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#3B82F6" 
                            fillOpacity={1} 
                            fill="url(#colorVisitors)" 
                            name="Visitors"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="pageViews" className="mt-6">
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
                          data={getDataForRange(timeRange, pageViewsData)}
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
              </TabsContent>
              
              <TabsContent value="bounceRate" className="mt-6">
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
                          data={getDataForRange(timeRange, bounceRateData)}
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
              </TabsContent>
              
              <TabsContent value="duration" className="mt-6">
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
                          data={getDataForRange(timeRange, durationData)}
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
                              return [`${minutes}m ${seconds}s`, 'Duration']
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectAnalytics;
