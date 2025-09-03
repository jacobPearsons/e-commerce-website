import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  BarChart3,
  Settings,
  LogOut,
  X,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { NavigationItem } from '../../types';
import Card from '../ui/Card';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
}) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const itemVariants = {
    collapsed: { x: 0 },
    expanded: { x: 0 }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`fixed left-0 top-0 z-50 h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-700 lg:relative lg:translate-x-0 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-3"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PP</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ProfilePro
                </span>
              </motion.div>
            )}
            
            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            >
              <X size={20} />
            </button>

            {/* Desktop collapse button */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft
                size={20}
                className={`transform transition-transform ${
                  isCollapsed ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Card glass padding="sm" className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-10 w-10 rounded-full border-2 border-white/50"
                  />
                  {!isCollapsed && (
                    <motion.div
                      variants={itemVariants}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        @{user.username}
                      </p>
                    </motion.div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                >
                  <item.icon
                    size={20}
                    className={`${isCollapsed ? 'mx-auto' : 'mr-3'} ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : ''
                    }`}
                  />
                  {!isCollapsed && (
                    <motion.span
                      variants={itemVariants}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                  {item.badge && !isCollapsed && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-all duration-200"
            >
              <LogOut size={20} className={isCollapsed ? 'mx-auto' : 'mr-3'} />
              {!isCollapsed && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;