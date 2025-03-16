
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface TimeRangeSelectorProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const TimeRangeSelector = ({ timeRange, setTimeRange }: TimeRangeSelectorProps) => {
  return (
    <div className="mt-4 md:mt-0">
      <ToggleGroup 
        type="single" 
        value={timeRange} 
        onValueChange={(value) => value && setTimeRange(value)}
      >
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
  );
};

export default TimeRangeSelector;
