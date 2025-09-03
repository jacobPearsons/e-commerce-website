import React from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../../navLinks";


interface NavLink {
  label: string;
  to: string;
}

interface AnimatedLogoProps {
  links?: NavLink[];
}

export default function AnimatedLogo() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-neutral-950/95 border-b border-neutral-800 shadow-lg flex flex-col items-center py-4">
      <div className="flex flex-col items-center">
        <Link
          to="/"
          aria-label="Go to home"
        >
        <img
          src=""
          alt="PathMatch Logo"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg border-4 border-neutral-900"
          style={{ objectFit: "contain" }}
        />
      </Link>
      </div>
      <nav className="mt-4 flex gap-8 justify-center">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-white hover:text-blue-400 font-semibold text-lg transition-colors tracking-wide"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
} 