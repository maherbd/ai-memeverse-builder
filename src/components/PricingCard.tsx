
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingFeature {
  text: string;
  available: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
  onSelect: () => void;
}

const PricingCard = ({
  name,
  description,
  price,
  period,
  features,
  isPopular = false,
  buttonText,
  onSelect,
}: PricingCardProps) => {
  return (
    <div 
      className={cn(
        "glass-morphism rounded-xl border relative transition-all duration-300 flex flex-col h-full animate-on-scroll opacity-0",
        isPopular 
          ? "border-primary/30 scale-105 md:scale-110 z-10" 
          : "border-white/10 hover:border-white/30"
      )}
    >
      {isPopular && (
        <div className="absolute -top-4 inset-x-0 mx-auto w-fit px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-white/70 mb-4">{description}</p>
        
        <div className="mb-6">
          <div className="flex items-end gap-1">
            <span className="text-3xl md:text-4xl font-bold">{price}</span>
            {period && <span className="text-white/60 mb-1">/{period}</span>}
          </div>
        </div>
        
        <Button 
          onClick={onSelect}
          variant={isPopular ? "default" : "outline"}
          className={cn(
            "w-full",
            !isPopular && "glass-morphism border-white/10 hover:bg-white/5"
          )}
        >
          {buttonText}
        </Button>
      </div>
      
      <div className="border-t border-white/10 p-6 md:p-8 mt-auto">
        <p className="font-medium mb-4">What's included:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-0.5 ${feature.available ? "text-green-400" : "text-white/30"}`}>
                <Check size={16} />
              </span>
              <span className={feature.available ? "text-white/90" : "text-white/50"}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
