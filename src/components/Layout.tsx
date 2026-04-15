import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import Logo from './Logo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rankings', path: '/rankings' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Training', path: '/training' },
    { name: 'Spotlights', path: '/spotlights' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-brand-black/90 backdrop-blur-md border-b border-brand-gold/20' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="scale-75 origin-left" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'font-accent text-xl uppercase tracking-wider transition-colors hover:text-brand-gold',
                location.pathname === link.path ? 'text-brand-gold' : 'text-brand-white'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/register"
            className="bg-brand-gold text-brand-black font-display font-black px-6 py-2 uppercase italic skew-x-[-12deg] hover:scale-105 transition-transform"
          >
            <span className="skew-x-[12deg] block">Register Profile</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-black border-b border-brand-gold/20 p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'font-accent text-2xl uppercase tracking-wider',
                  location.pathname === link.path ? 'text-brand-gold' : 'text-brand-white'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="bg-brand-gold text-brand-black font-display font-black px-6 py-3 uppercase italic text-center"
            >
              Register Profile
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-black border-t border-brand-gold/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <Logo className="mb-6" />
          <p className="text-brand-white/60 max-w-xs">
            The home of youth padel in SA. Building the next generation of players through community and competition.
          </p>
        </div>
        <div>
          <h4 className="font-accent text-xl mb-4 text-brand-gold uppercase tracking-widest">Quick Links</h4>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-brand-white/60 hover:text-brand-gold transition-colors">Home</Link>
            <Link to="/rankings" className="text-brand-white/60 hover:text-brand-gold transition-colors">Rankings</Link>
            <Link to="/tournaments" className="text-brand-white/60 hover:text-brand-gold transition-colors">Tournaments</Link>
            <Link to="/training" className="text-brand-white/60 hover:text-brand-gold transition-colors">Training & Tips</Link>
            <Link to="/spotlights" className="text-brand-white/60 hover:text-brand-gold transition-colors">Player Spotlights</Link>
            <Link to="/register" className="text-brand-white/60 hover:text-brand-gold transition-colors">Register Profile</Link>
          </div>
        </div>
        <div>
          <h4 className="font-accent text-xl mb-4 text-brand-gold uppercase tracking-widest">Connect</h4>
          <a 
            href="https://instagram.com/sapAdelyouthhub" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-brand-white/60 hover:text-brand-gold transition-colors mb-4"
          >
            <Instagram size={20} />
            <span>@sapAdelyouthhub</span>
          </a>
          <div className="bg-brand-gold/5 border border-brand-gold/20 p-4 rounded-sm italic">
            <p className="text-sm text-brand-gold font-medium">Join our WhatsApp Community</p>
            <Link to="/register" className="text-xs underline hover:text-brand-white transition-colors">Register to get the link</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-white/40">
        <p>© {new Date().getFullYear()} SA Padel Youth Hub. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-gold">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
