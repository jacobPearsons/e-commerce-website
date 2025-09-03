import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logowide } from '../assets/images';
import MobileMenuModal from './MobileMenuModal';

const AnimatedLogo: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Contact Us', href: '/contact' },
  ];

  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Church Name */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <img src={logowide} alt="New Creature in Christ Church Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                <div className="hidden sm:block">
                  <h1 className="text-white font-bold text-lg md:text-xl">New Creature in Christ</h1>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Home Link */}
              <Link
                to="/"
                className={`transition-colors font-medium ${
                  isActiveLink('/') 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                Home
              </Link>

              {/* New Here Link */}
              <Link
                to="/new-here"
                className={`transition-colors font-medium ${
                  isActiveLink('/new-here') 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-white hover:text-gray-300'
                }`}
              >
                New Here?
              </Link>

              {/* Other Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`transition-colors font-medium ${
                    isActiveLink(link.href) 
                      ? 'text-blue-400 border-b-2 border-blue-400' 
                      : 'text-white hover:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center min-w-[60px] justify-end">
              <button 
                className="text-white hover:text-zinc-300 focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="7" x2="19" y2="7" strokeLinecap="round" />
                  <line x1="5" y1="12" x2="19" y2="12" strokeLinecap="round" />
                  <line x1="5" y1="17" x2="19" y2="17" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal */}
      <MobileMenuModal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        currentPath={location.pathname}
      />
    </>
  );
};

export default AnimatedLogo; 