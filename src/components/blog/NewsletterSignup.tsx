
import { ArrowRight } from 'lucide-react';

const NewsletterSignup = () => {
  return (
    <div className="animate-fade-in animate-delay-300">
      <div className="glass-morphism border border-white/10 rounded-xl p-8 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
        <p className="text-white/70 mb-6">
          Subscribe to our newsletter for the latest Web3 website building tips and trends.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow glass-morphism bg-white/5 border border-white/10 rounded-md px-4 py-2"
          />
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors">
            Subscribe
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
