import React from 'react';
import { motion } from 'framer-motion';
import { User, ThumbsUp, Eye, Upload, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../ui/Card';

const ActivityFeed: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile_view':
        return Eye;
      case 'skill_endorsement':
        return ThumbsUp;
      case 'profile_update':
        return User;
      case 'document_upload':
        return Upload;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'profile_view':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'skill_endorsement':
        return 'text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'profile_update':
        return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'document_upload':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/30';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Last 30 days
        </span>
      </div>

      <div className="space-y-4">
        {user.activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClasses = getActivityColor(activity.type);

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              {/* Activity Icon */}
              <div className={`flex-shrink-0 p-2 rounded-full ${colorClasses}`}>
                <Icon size={16} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                  {activity.metadata && (
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      •
                    </span>
                  )}
                  {activity.metadata?.viewer && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      by {activity.metadata.viewer}
                    </span>
                  )}
                  {activity.metadata?.skill && (
                    <span className="text-xs bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-2 py-0.5 rounded-full">
                      {activity.metadata.skill}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {user.activities.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Clock size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No recent activity
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Your profile activity will appear here as you engage with the platform.
          </p>
        </div>
      )}
    </Card>
  );
};

export default ActivityFeed;