import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ThumbsUp, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const SkillsSection: React.FC = () => {
  const { user } = useAuth();
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  if (!user) return null;

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      // In a real app, this would call an API
      console.log('Adding skill:', newSkill);
      setNewSkill('');
      setShowAddSkill(false);
    }
  };

  const handleEndorseSkill = (skillId: string) => {
    // In a real app, this would call an API
    console.log('Endorsing skill:', skillId);
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Skills & Expertise
        </h2>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={() => setShowAddSkill(true)}
        >
          Add Skill
        </Button>
      </div>

      {/* Add Skill Form */}
      <AnimatePresence>
        {showAddSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex space-x-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name..."
                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                autoFocus
              />
              <Button variant="primary" size="sm" onClick={handleAddSkill}>
                Add
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={X}
                onClick={() => setShowAddSkill(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {user.skills
          .sort((a, b) => b.endorsementCount - a.endorsementCount)
          .map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card
                hover
                glass
                padding="sm"
                className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEndorseSkill(skill.id)}
                    className="p-1 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <ThumbsUp size={16} />
                  </motion.button>
                </div>

                {/* Endorsement Count */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.endorsementCount} endorsements
                  </span>
                  
                  {/* Progress Bar */}
                  <div className="flex-1 ml-3">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min(
                            (skill.endorsementCount / Math.max(...user.skills.map(s => s.endorsementCount))) * 100,
                            100
                          )}%`,
                        }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Skill Level Indicator */}
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      skill.endorsementCount >= 40
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : skill.endorsementCount >= 20
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {skill.endorsementCount >= 40
                      ? 'Expert'
                      : skill.endorsementCount >= 20
                      ? 'Intermediate'
                      : 'Beginner'}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
      </div>

      {user.skills.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Plus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skills added yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Showcase your expertise by adding your skills and getting endorsements.
          </p>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setShowAddSkill(true)}
          >
            Add Your First Skill
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SkillsSection;