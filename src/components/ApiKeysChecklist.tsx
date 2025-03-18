
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, CheckCircle, Circle, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ApiKeyType = {
  id: string;
  name: string;
  description: string;
  url: string;
  required: boolean;
  pricingInfo?: string;
};

const API_KEYS: ApiKeyType[] = [
  {
    id: "perplexity",
    name: "Perplexity API",
    description: "Powers AI search and content generation features for documentation and support sections.",
    url: "https://www.perplexity.ai/api",
    required: false,
    pricingInfo: "Offers free tier with usage limits, paid plans available."
  },
  {
    id: "solana",
    name: "Solana RPC",
    description: "Required for blockchain interactions, transaction verification, and wallet connections.",
    url: "https://docs.solana.com/cluster/rpc-endpoints",
    required: true,
    pricingInfo: "Public endpoints available with rate limits, dedicated nodes recommended for production."
  },
  {
    id: "coingecko",
    name: "CoinGecko API",
    description: "Used for cryptocurrency price data, market cap information, and trading volume stats.",
    url: "https://www.coingecko.com/en/api",
    required: false,
    pricingInfo: "Free tier available with rate limits, Pro plans for higher usage."
  },
  {
    id: "web3storage",
    name: "Web3.Storage",
    description: "For decentralized file storage, IPFS integration, and NFT metadata hosting.",
    url: "https://web3.storage/",
    required: false,
    pricingInfo: "Free tier up to 5GB storage, paid plans for more space and requests."
  }
];

const ApiKeysChecklist = () => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]);
  const { toast } = useToast();
  
  const handleCheck = (id: string) => {
    setCheckedKeys(prev => 
      prev.includes(id) 
        ? prev.filter(keyId => keyId !== id) 
        : [...prev, id]
    );
    
    if (!checkedKeys.includes(id)) {
      toast({
        title: "API Key marked as ready",
        description: `Don't forget to properly secure your API keys using environment variables.`,
      });
    }
  };
  
  const getProgress = () => {
    const requiredKeys = API_KEYS.filter(key => key.required);
    const checkedRequiredKeys = requiredKeys.filter(key => checkedKeys.includes(key.id));
    return {
      requiredTotal: requiredKeys.length,
      requiredCompleted: checkedRequiredKeys.length,
      optionalTotal: API_KEYS.length - requiredKeys.length,
      optionalCompleted: checkedKeys.length - checkedRequiredKeys.length
    };
  };
  
  const progress = getProgress();
  
  return (
    <Card className="w-full overflow-hidden border-white/10 glass-morphism">
      <CardHeader className="bg-white/5 border-b border-white/10">
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Keys Checklist
        </CardTitle>
        <CardDescription>
          Track and manage the API keys required for this project
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Required Keys</span>
            <span className="text-primary">{progress.requiredCompleted}/{progress.requiredTotal}</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ 
                width: progress.requiredTotal > 0 
                  ? `${(progress.requiredCompleted / progress.requiredTotal) * 100}%` 
                  : '0%' 
              }}
            ></div>
          </div>
          
          <div className="flex justify-between mb-2 mt-4">
            <span>Optional Keys</span>
            <span className="text-primary/70">{progress.optionalCompleted}/{progress.optionalTotal}</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary/70 transition-all duration-500 ease-in-out" 
              style={{ 
                width: progress.optionalTotal > 0 
                  ? `${(progress.optionalCompleted / progress.optionalTotal) * 100}%` 
                  : '0%' 
              }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-6 mt-8">
          {API_KEYS.map((key) => (
            <div key={key.id} className={`p-4 rounded-lg border ${key.required ? 'border-white/20' : 'border-white/10'} ${checkedKeys.includes(key.id) ? 'bg-primary/10' : 'bg-white/5'}`}>
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  <Checkbox 
                    id={key.id} 
                    checked={checkedKeys.includes(key.id)}
                    onCheckedChange={() => handleCheck(key.id)}
                    className={key.required ? 'border-primary' : ''}
                  />
                </div>
                <div className="flex-1">
                  <label 
                    htmlFor={key.id} 
                    className="text-base font-medium flex items-center cursor-pointer"
                  >
                    {key.name}
                    {key.required && (
                      <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                        Required
                      </span>
                    )}
                  </label>
                  <p className="text-sm text-white/70 mt-1">
                    {key.description}
                  </p>
                  
                  {key.pricingInfo && (
                    <p className="text-xs text-white/60 mt-2">
                      <span className="font-medium">Pricing:</span> {key.pricingInfo}
                    </p>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 text-xs" 
                  onClick={() => window.open(key.url, '_blank', 'noopener,noreferrer')}
                >
                  <ExternalLink size={14} className="mr-1" />
                  Get Key
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="font-medium mb-2">Best Practices for API Keys</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
              <span>Never expose API keys in your frontend code</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
              <span>Use environment variables or a backend service for sensitive keys</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
              <span>For Supabase integration, store keys in Supabase Edge Function Secrets</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
              <span>Rotate keys regularly and implement rate limiting</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeysChecklist;
