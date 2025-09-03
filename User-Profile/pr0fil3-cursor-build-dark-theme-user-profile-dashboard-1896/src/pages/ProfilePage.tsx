import React from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/profile/ProfileHeader';
import InteractiveSkillsSection from '../components/profile/InteractiveSkillsSection';
import ActivityFeed from '../components/profile/ActivityFeed';

const ProfilePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your professional identity and showcase your expertise.
        </p>
      </div>

      {/* Profile Header */}
      <ProfileHeader />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Skills */}
        <div className="lg:col-span-2">
          <InteractiveSkillsSection />
        </div>

        {/* Right Column - Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;