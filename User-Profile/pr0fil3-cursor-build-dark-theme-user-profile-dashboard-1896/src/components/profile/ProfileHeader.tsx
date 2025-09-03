import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit3, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Card from '../ui/Card';
import LazyImage from '../ui/LazyImage';

const ProfileHeader: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Card glass padding="none" className="overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 lg:h-64">
        <LazyImage
          src={user.coverUrl}
          alt="Cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Cover Photo Edit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-sm rounded-lg text-white hover:bg-black/50 transition-colors"
        >
          <Camera size={20} />
        </motion.button>
      </div>

      {/* Profile Content */}
      <div className="relative px-6 pb-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6 -mt-16 mb-4">
          <div className="relative">
            <LazyImage
              src={user.avatarUrl}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-2 right-2 p-2 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            >
              <Camera size={16} />
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-4 sm:mt-0 sm:mb-4">
            <Button
              variant="primary"
              icon={Edit3}
              onClick={() => setIsEditing(!isEditing)}
            >
              Edit Profile
            </Button>
            <Button variant="outline" icon={ExternalLink}>
              View Public
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              @{user.username}
            </p>
          </div>

          {/* Bio */}
          <div className="max-w-3xl">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {user.bio}
            </p>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>San Francisco, CA</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.profileViews.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Profile Views
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.skills.reduce((total, skill) => total + skill.endorsementCount, 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Endorsements
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {user.skills.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Skills
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(ProfileHeader);