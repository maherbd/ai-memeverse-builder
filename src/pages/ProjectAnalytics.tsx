
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/utils/animation';
import { visitorsData, pageViewsData, bounceRateData, durationData } from '@/utils/chartData';
import ProjectHeader from '@/components/analytics/ProjectHeader';
import TimeRangeSelector from '@/components/analytics/TimeRangeSelector';
import StatsOverview from '@/components/analytics/StatsOverview';
import AnalyticsTabs from '@/components/analytics/AnalyticsTabs';

const ProjectAnalytics = () => {
  const { id } = useParams();
  
  // Initialize scroll animations
  useScrollAnimation();
  
  // State
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);
  
  // Mock project data
  const project = {
    id,
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
  
  // Prepare chart data based on time range
  const chartData = {
    visitors: getDataForRange(timeRange, visitorsData),
    pageViews: getDataForRange(timeRange, pageViewsData),
    bounceRate: getDataForRange(timeRange, bounceRateData),
    duration: getDataForRange(timeRange, durationData)
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
          {/* Project Header */}
          <ProjectHeader 
            projectId={project.id || ''} 
            projectName={project.name} 
            domain={project.domain} 
          />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            {/* Time Range Selector */}
            <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
          </div>
          
          {/* Stats Overview */}
          <StatsOverview stats={project.stats} loading={loading} />
          
          {/* Charts */}
          <div className="space-y-8 animate-fade-in animate-delay-300">
            <AnalyticsTabs data={chartData} loading={loading} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectAnalytics;
