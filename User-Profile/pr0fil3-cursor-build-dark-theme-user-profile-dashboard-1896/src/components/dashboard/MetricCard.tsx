import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Card from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label: string;
    trend: 'up' | 'down';
  };
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  loading?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  loading = false,
}) => {
  const colorClasses = {
    blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    green: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    orange: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
    red: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  };

  if (loading) {
    return (
      <Card glass>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>
      </Card>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card glass hover className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent" />
        </div>

        {/* Content */}
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </h3>
            <div className={`p-2 rounded-full ${colorClasses[color]}`}>
              <Icon size={20} />
            </div>
          </div>

          {/* Value */}
          <div className="mb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {value}
            </motion.div>
          </div>

          {/* Change Indicator */}
          {change && (
            <div className="flex items-center space-x-1">
              {change.trend === 'up' ? (
                <TrendingUp size={16} className="text-green-500" />
              ) : (
                <TrendingDown size={16} className="text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  change.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {change.label}
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default memo(MetricCard);