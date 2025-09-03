import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logowide } from '../assets/images';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

const fundOptions = [
  { label: "Mutual Funds", to: "/funds", isHeader: true },
  { label: "GreenHarbor US Value Fund", to: "/funds/greenharbor-us-value-fund" },
  { label: "GreenHarbor International All Cap Fund", to: "/funds/greenharbor-international-all-cap-equity-fund" },
  { label: "GreenHarbor GQE Global Balanced Fund", to: "/funds/greenharbor-gqe-global-balanced-fund" },
  { label: "GreenHarbor GQE US Alpha Extension Fund", to: "/funds/greenharbor-gqe-us-alpha-extension-fund" },
];

interface Branch {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

function fractalTree(
  startX: number, 
  startY: number,
  length: number,
  angle: number,
  depth: number,
  branches: Branch[] = []
): Branch[] {
  if (depth === 0) return branches;

  const endX = startX + length * Math.cos(angle);
  const endY = startY - length * Math.sin(angle);
  
  branches.push({
    start: { x: startX, y: startY },
    end: { x: endX, y: endY }
  });

  // Recursive branches (45° split)
  fractalTree(endX, endY, length * 0.75, angle - Math.PI / 4, depth - 1, branches);
  fractalTree(endX, endY, length * 0.75, angle + Math.PI / 4, depth - 1, branches);

  return branches;
}

export default function AnimatedLogo() {
  const [showBanner, setShowBanner] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [showFundsDropdown, setShowFundsDropdown] = useState(false);

  // Memoize branches for performance
  const branches = useMemo(() => fractalTree(50, 90, 32, -Math.PI/2, 7), []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Show banner when at top, hide when scrolled down
      if (currentScrollY <= 10) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Maintenance Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#FFFBF7] border-b border-orange-200 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
              {/* Information Icon */}
              <div className="flex-shrink-5 items-center">
                <div className="relative">
                  <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">i</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Message Box */}
              <div className="flex-1 items center">
                <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
                  <span className="block text-l text-black font-medium">
                    We are conducting scheduled maintenance on Sunday, July 27<sup>th</sup>, 2025 from 9:00pm to 11:59pm ET, you may experience temporary service outages during this time.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <header 
        className={`w-full fixed left-0 z-40 bg-white/95 border-b border-green-700 shadow-lg flex flex-col items-center py-4 transition-all duration-300 ${
          showBanner ? 'top-[72px]' : 'top-0'
        }`}
      >
        <div className="flex flex-col items-center relative">
          <Link to="/" aria-label="Go to home" className="mb-2 relative flex items-center justify-center">
            <motion.svg
              width={100}
              height={100}
              viewBox="0 0 100 100"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
              animate={{ opacity: 0.7, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {branches.map((branch, i) => (
                <line
                  key={i}
                  x1={branch.start.x}
                  y1={branch.start.y}
                  x2={branch.end.x}
                  y2={branch.end.y}
                  stroke="#047857"
                  strokeWidth={1.2 - branch.start.y / 120}
                  strokeLinecap="round"
                  opacity={0.7}
                />
              ))}
            </motion.svg>
            <img src={logowide} alt="GreenHarbor Capital Logo" className="w-40 h-auto object-contain rounded-lg shadow-lg border-2 border-green-700 bg-white relative z-10" />
          </Link>
          <span className="text-2xl font-bold text-green-800 tracking-tight mb-1">GreenHarbor Capital</span>
        </div>
        <nav className="mt-2 flex gap-8 justify-center">
          {/* Home Link */}
          <Link
            to="/"
            className="text-green-900 hover:text-green-700 font-semibold text-lg transition-colors tracking-wide"
          >
            Home
          </Link>
          
          {/* Mutual Funds Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setShowFundsDropdown(true)}
            onMouseLeave={() => setShowFundsDropdown(false)}
          >
            <button className="text-green-900 hover:text-green-700 font-semibold text-lg transition-colors tracking-wide flex items-center gap-1">
              Mutual Funds
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showFundsDropdown ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {showFundsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {fundOptions.map((option, index) => (
                    <div key={option.to}>
                      <Link
                        to={option.to}
                        className={`block px-4 py-3 text-green-600 hover:bg-green-50 transition-colors ${
                          option.isHeader ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </Link>
                      {option.isHeader && (
                        <div className="border-b border-gray-200 mx-4 my-2"></div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Other Navigation Links */}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-green-900 hover:text-green-700 font-semibold text-lg transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
} 