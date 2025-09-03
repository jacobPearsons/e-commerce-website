import React from 'react';
import { logowide } from '../assets/images';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black py-12 md:py-16 px-2 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Layout - 2 Columns */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Left Column - Church Info */}
            <div className="col-span-2 space-y-4">
              {/* Logo */}
              <div className="flex items-center mb-4">
                <img src={logowide} alt="New Creature in Christ Church Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
              </div>
              {/* Church Description */}
              <p className="text-white text-sm sm:text-base font-semibold leading-relaxed">
                New Creature in Christ Church is a diverse, family driven, community focused, and life giving church in Baruwa, Ipaja, Lagos.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-base mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-white hover:text-gray-300 transition-colors text-sm">About</a></li>
                <li><a href="/new-here" className="text-white hover:text-gray-300 transition-colors text-sm">New Here?</a></li>
                <li><a href="/events" className="text-white hover:text-gray-300 transition-colors text-sm">Events</a></li>
                <li><a href="/contact" className="text-white hover:text-gray-300 transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-3">
              <h3 className="text-white font-bold text-base mb-2">Connect</h3>
              <ul className="space-y-2">
                <li><a href="/get-involved" className="text-white hover:text-gray-300 transition-colors text-sm">Get Involved</a></li>
                <li><a href="/sermons" className="text-white hover:text-gray-300 transition-colors text-sm">Sermons</a></li>
              </ul>
            </div>

            {/* Media */}
            <div className="col-span-2 space-y-3">
              <h3 className="text-white font-bold text-base mb-2">Media</h3>
              <ul className="space-y-2">
                <li><a href="/church-online" className="text-white hover:text-gray-300 transition-colors text-sm">Church Online</a></li>
                <li><a href="/new-creature-kids" className="text-white hover:text-gray-300 transition-colors text-sm">New Creature Kids</a></li>
              </ul>
            </div>

            {/* Address and Map */}
            <div className="col-span-2 space-y-3">
              <h3 className="text-white font-bold text-base mb-2">Find Us</h3>
              <div className="rounded-lg overflow-hidden border border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4183396894673!2d3.2619281999999994!3d6.5948153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9076993b314b%3A0x347e767319b7e6da!2s15%20New%20Creature%20Church%20St%2C%20Idimu%2C%20Lagos%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1753706846020!5m2!1sen!2sng"
                  width="100%"
                  height="120"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="New Creature in Christ Church Map"
                ></iframe>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="col-span-2 flex gap-3 sm:gap-4 pt-4">
              <a href="https://www.facebook.com/share/16mHWM56M2/" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/new_creature_church?" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@new_creature_church?" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="info@newcreaturechurch.com" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Original 4 Columns */}
        <div className="hidden lg:grid grid-cols-4 gap-8 lg:gap-6 items-start">
          {/* Left Column - Church Information (Wider) */}
          <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
            {/* Logo */}
            <div className="flex items-center mb-4">
              <img src={logowide} alt="New Creature in Christ Church Logo" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
            </div>
            {/* Church Description */}
            <p className="text-white text-base sm:text-lg md:text-l font-semibold leading-relaxed">
              New Creature in Christ Church is a diverse, family driven, community focused, and life giving church in Baruwa, Ipaja, Lagos.
            </p>
            {/* Street Address */}
            <div className="space-y-1">
              <h3 className="text-white font-bold text-base sm:text-lg mb-2">Find Us</h3>
              <div className="rounded-lg overflow-hidden border border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4183396894673!2d3.2619281999999994!3d6.5948153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9076993b314b%3A0x347e767319b7e6da!2s15%20New%20Creature%20Church%20St%2C%20Idimu%2C%20Lagos%20102213%2C%20Lagos!5e0!3m2!1sen!2sng!4v1753706846020!5m2!1sen!2sng"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="New Creature in Christ Church Map"
                ></iframe>
              </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex gap-3 sm:gap-4 pt-4">
              <a href="https://www.facebook.com/share/16mHWM56M2/" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/new_creature_church?" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@new_creature_church?" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="info@newcreaturechurch.com" className="text-white hover:text-gray-300 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Columns - Reduced Elements and Spacing */}
          <div className="col-span-1 space-y-4">
            <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white hover:text-gray-300 transition-colors">About</a></li>
              <li><a href="/new-here" className="text-white hover:text-gray-300 transition-colors">New Here?</a></li>
              <li><a href="/events" className="text-white hover:text-gray-300 transition-colors">Events</a></li>
              <li><a href="/contact" className="text-white hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="col-span-1 space-y-4">
            <h3 className="text-white font-bold text-lg mb-2">Connect</h3>
            <ul className="space-y-2">
              <li><a href="/get-involved" className="text-white hover:text-gray-300 transition-colors">Get Involved</a></li>
              <li><a href="/sermons" className="text-white hover:text-gray-300 transition-colors">Sermons</a></li>
            </ul>
          </div>
          <div className="col-span-1 space-y-4">
            <h3 className="text-white font-bold text-lg mb-2">Media</h3>
            <ul className="space-y-2">
              <li><a href="/church-online" className="text-white hover:text-gray-300 transition-colors">Church Online</a></li>
              <li><a href="/motivation-kids" className="text-white hover:text-gray-300 transition-colors">New Creature Kids</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              Copyright © 2025 New Creature in Christ Church - All Rights Reserved.
            </p>
            <div className="flex gap-4 lg:gap-6 text-gray-400 text-sm mt-4 md:mt-0">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/sitemap" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 