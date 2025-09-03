import React from 'react';
import { logoSrc } from '../assets/images';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-red-600 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-start">
        {/* Left: Logo and Description */}
        <div className="flex flex-col items-start space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-red-500 rounded-xl p-2 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
            </div>
            <span className="text-white text-2xl font-bold tracking-wide">PATHMATCH</span>
          </div>
          <p className="text-white text-base max-w-xs">
            Connecting exceptional talent with leading companies. We specialize in finding the perfect match for both employers and job seekers across all industries.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-white hover:text-red-400 transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 016 6v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a6 6 0 016-6h8z" /><rect width="4" height="4" x="2" y="2" rx="1" /></svg>
            </a>
            <a href="#" className="text-white hover:text-red-400 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4 1c-.88.52-1.85.87-2.88 1.07A4.48 4.48 0 0016.5 0c-2.5 0-4.5 2.01-4.5 4.5 0 .35.04.69.1 1.02C7.72 5.4 4.1 3.6 1.67.9c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.95 3.65A4.48 4.48 0 01.96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.56 1.74 2.18 3.01 4.1 3.05A9.01 9.01 0 010 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0024 4.59a9.03 9.03 0 01-2.6.71z" /></svg>
            </a>
            <a href="#" className="text-white hover:text-red-400 transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a4 4 0 00-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" /></svg>
              </a>
            </div>
          </div>
        {/* Center: Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-bold text-lg mb-3">Quick Links</h3>
          <ul className="text-white space-y-2 text-base">
            <li><a href="/job-seekers" className="hover:text-red-400 transition-colors">Browse Jobs</a></li>
            <li><a href="/employers" className="hover:text-red-400 transition-colors">For Employers</a></li>
            <li><a href="/candidates" className="hover:text-red-400 transition-colors">Find Candidates</a></li>
            <li><a href="/about-us" className="hover:text-red-400 transition-colors">About Us</a></li>
            </ul>
        </div>
        {/* Right: Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-bold text-lg mb-3">Contact Us</h3>
          <ul className="text-white space-y-2 text-base">
            <li className="flex items-center gap-2"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z" /></svg> El Mirage, Arizona 85335</li>
            <li className="flex items-center gap-2"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4a1 1 0 01-1 1h-3m-4 4v4m0 0H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2h-5z" /></svg> 407660702</li>
            <li className="flex items-center gap-2"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg> info@pathmatch.com</li>
          </ul>
        </div>
      </div>
      <hr className="my-8 border-blue-400/30" />
      <div className="text-center text-white text-sm space-y-2">
        <div>© 2025 PATHMATCH Employment Agency. All rights reserved.</div>
        <a href="/privacy" className="hover:text-red-400 transition-colors">Privacy Policy</a>
      </div>
    </footer>
  );
};

export default Footer; 