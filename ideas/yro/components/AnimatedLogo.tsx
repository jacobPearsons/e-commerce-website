import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from '../navLinks';

interface NavLink {
  label: string;
  to: string;
}

interface AnimatedLogoProps {
  links?: NavLink[];
}

export default function AnimatedLogo() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/95 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link
            to="/"
            aria-label="Go to home"
            className="flex items-center space-x-3"
          >
            {/* Red square icon with briefcase */}
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" 
                />
              </svg>
            </div>
            {/* Brand name */}
            <span className="text-2xl font-bold text-gray-800 tracking-wide">
            PATHMATCH
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-red-600 font-medium text-base transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 