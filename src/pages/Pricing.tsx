
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { useScrollAnimation } from '@/utils/animation';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Pricing = () => {
  // Initialize scroll animations
  useScrollAnimation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { toast } = useToast();
  
  const handleSelectPlan = (planName: string) => {
    // This would be replaced with actual payment processing logic
    toast({
      title: "Plan Selected",
      description: `You've selected the ${planName} plan. Connect your wallet to proceed with payment.`,
    });
  };
  
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for beginners",
      price: "$0",
      period: "forever",
      buttonText: "Get Started",
      features: [
        { text: "1 website", available: true },
        { text: "Basic templates", available: true },
        { text: "Reham subdomain", available: true },
        { text: "Community support", available: true },
        { text: "Basic analytics", available: true },
        { text: "Custom domain", available: false },
        { text: "Premium templates", available: false },
        { text: "Priority support", available: false },
        { text: "Advanced analytics", available: false },
      ],
      isPopular: false,
    },
    {
      name: "Pro",
      description: "For serious meme coin projects",
      price: "100 USDC",
      period: "one-time",
      buttonText: "Get Pro",
      features: [
        { text: "Unlimited websites", available: true },
        { text: "All templates (including premium)", available: true },
        { text: "Custom domain support", available: true },
        { text: "Priority support", available: true },
        { text: "Advanced analytics", available: true },
        { text: "Token charts integration", available: true },
        { text: "Referral system access", available: true },
        { text: "Price tickers", available: true },
        { text: "No Reham branding", available: true },
      ],
      isPopular: true,
    },
    {
      name: "Enterprise",
      description: "For large-scale Web3 businesses",
      price: "Contact",
      period: "",
      buttonText: "Contact Us",
      features: [
        { text: "Everything in Pro", available: true },
        { text: "Custom template development", available: true },
        { text: "Dedicated account manager", available: true },
        { text: "SLA guarantees", available: true },
        { text: "Custom integrations", available: true },
        { text: "Advanced security", available: true },
        { text: "Team collaboration", available: true },
        { text: "API access", available: true },
        { text: "White-label solution", available: true },
      ],
      isPopular: false,
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Simple, Transparent Pricing</h1>
            <p className="text-white/70 text-lg">
              Choose the plan that works best for your Web3 project
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                isPopular={plan.isPopular}
                buttonText={plan.buttonText}
                onSelect={() => handleSelectPlan(plan.name)}
              />
            ))}
          </div>
          
          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-gradient">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "How do payments work?",
                  answer: "All payments are processed on-chain using USDC. We support both Ethereum (ERC-20) and Solana (SPL) USDC tokens. Simply connect your wallet and complete the transaction when subscribing to the Pro plan."
                },
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer: "Yes, you can upgrade from Free to Pro at any time. Since the Pro plan is a one-time payment, there is no need to downgrade."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "Due to the nature of blockchain transactions, we cannot offer refunds. However, we provide a free plan so you can try our service before purchasing the Pro plan."
                },
                {
                  question: "How does the referral system work?",
                  answer: "Pro users receive a unique referral link. When someone signs up using your link and purchases the Pro plan, you'll earn 10% of their payment (paid in SOL), and they'll receive a 10% discount."
                },
                {
                  question: "Can I use my own custom domain?",
                  answer: "Yes, Pro users can connect their own custom domain to their website. We provide easy-to-follow instructions to set up your DNS records."
                }
              ].map((faq, index) => (
                <div key={index} className="glass-morphism rounded-lg border border-white/10 p-6 animate-on-scroll opacity-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
