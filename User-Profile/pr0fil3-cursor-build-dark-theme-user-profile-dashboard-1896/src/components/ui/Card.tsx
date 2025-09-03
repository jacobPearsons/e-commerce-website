import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  glass = false,
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = `rounded-xl border transition-all duration-200 ${paddingClasses[padding]}`;
  
  const glassClasses = glass 
    ? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border-white/20 dark:border-gray-700/20' 
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  
  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default memo(Card);