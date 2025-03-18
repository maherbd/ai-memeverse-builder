
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      
      // Reset the success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="animate-fade-in animate-delay-300">
      <div className="glass-morphism border border-white/10 rounded-xl p-8 text-center max-w-3xl mx-auto relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          Subscribe to our newsletter for the latest Web3 website building tips and trends.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <div className="relative flex-grow">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address" 
              className="w-full glass-morphism bg-white/5 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              disabled={isSubmitting || isSubscribed}
            />
            {isSubscribed && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="bg-green-500/20 text-green-500 rounded-full p-1">
                  <Check size={14} />
                </div>
              </div>
            )}
          </div>
          <button 
            type="submit"
            disabled={isSubmitting || isSubscribed}
            className={`bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="animate-pulse">Processing...</div>
            ) : (
              <>
                Subscribe
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-4 text-xs text-white/50">
          We respect your privacy. Unsubscribe at any time.
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
