
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WalletConnect from './WalletConnect';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'Templates', href: '/templates' },
    { text: 'Pricing', href: '/pricing' },
    { text: 'Dashboard', href: '/dashboard' },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-lg border-b border-white/10' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Reham</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative text-sm transition-colors hover:text-primary ${
                isActive(link.href) 
                  ? 'text-primary font-medium after:content-[""] after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:bg-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              {link.text}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <WalletConnect />
          {!isAuthenticated && (
            <Link to="/auth">
              <Button variant="outline" className="glass-morphism border-white/10 hover:bg-white/5">
                <User size={16} className="mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-white/10 py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`py-2 text-sm transition-colors ${
                  isActive(link.href) ? 'text-primary font-medium' : 'text-muted-foreground'
                }`}
              >
                {link.text}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <WalletConnect isMobile={true} />
            </div>
            {!isAuthenticated && (
              <Link to="/auth" className="w-full">
                <Button variant="outline" className="w-full glass-morphism border-white/10 hover:bg-white/5">
                  <User size={16} className="mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
