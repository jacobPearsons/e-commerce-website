import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logowide } from '../assets/images';

interface MobileMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ isOpen, onClose, currentPath }) => {
  // Helper function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4"
          >
            <div className="w-full max-w-6xl h-full bg-black text-white overflow-y-auto">
              {/* Header with Close Button */}
              <div className="flex justify-between items-start p-6 border-b border-gray-800">
                <div className="flex items-center">
                  <img src={logowide} alt="New Creature in Christ Church Logo" className="w-16 h-16 object-contain" />
                  <div className="ml-4">
                    <h1 className="text-white font-bold text-xl">NEW CREATURE IN CHRIST</h1>
                    <p className="text-gray-300 text-sm">CHURCH</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-300 transition-colors p-2"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
                {/* Left Column - Main Navigation */}
                <div className="lg:col-span-1 space-y-8">
                  {/* New Here Section */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-300 mb-6">New Here?</h2>
                  </div>

                  {/* Main Navigation Links */}
                  <nav className="space-y-6">
                    <Link
                      to="/"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      Home
                    </Link>
                    <Link
                      to="/new-here"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/new-here') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      New Here?
                    </Link>
                    <Link
                      to="/about"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/about') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      About
                    </Link>
                    <Link
                      to="/sermons"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/sermons') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      Sermons
                    </Link>
                    <Link
                      to="/get-involved"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/get-involved') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      Get Involved
                    </Link>
                    <Link
                      to="/care"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/care') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      Care
                    </Link>
                    <Link
                      to="/give"
                      className={`block text-2xl font-bold transition-colors ${
                        isActiveLink('/give') 
                          ? 'text-green-400' 
                          : 'text-white hover:text-gray-300'
                      }`}
                      onClick={onClose}
                    >
                      Give
                    </Link>
                  </nav>
                </div>

                {/* Right Column - Recent Sermons, Useful Links, Social Media */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Recent Sermons */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">Recent Sermons</h3>
                    <div className="space-y-4">
                      {/* Sermon 1 */}
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center relative flex-shrink-0">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-lg">IN HIM</h4>
                          <p className="text-gray-400 text-sm">Pastor David Ibukun · Jul 20, 2025</p>
                        </div>
                      </div>

                      {/* Sermon 2 */}
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center relative flex-shrink-0">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold text-lg">At the Movies</h4>
                          <p className="text-gray-400 text-sm">Travis Jones · Jul 13, 2025</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Useful Links */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">Useful Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Link
                          to="/church-online"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Church Online
                        </Link>
                        <Link
                          to="/next-steps"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Next Steps
                        </Link>
                        <Link
                          to="/contact"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Contact
                        </Link>
                        <Link
                          to="/engage"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Engage
                        </Link>
                      </div>
                      <div className="space-y-3">
                        <Link
                          to="/motivation-kids"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Motivation Kids
                        </Link>
                        <Link
                          to="/motivation-yth"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Motivation YTH
                        </Link>
                        <Link
                          to="/small-groups"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Small Groups
                        </Link>
                        <Link
                          to="/events"
                          className="block text-white hover:text-gray-300 transition-colors"
                          onClick={onClose}
                        >
                          Events
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  <div className="flex space-x-6">
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </a>
                    <a href="#" className="text-white hover:text-gray-300 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>
                    <a href="mailto:info@newcreaturechurch.com" className="text-white hover:text-gray-300 transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenuModal; 