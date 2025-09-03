import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ThumbsUp, X, Search, Star } from 'lucide-react';
import { apiService } from '../../services/api';
import { webSocketService } from '../../services/websocket';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';
import Button from '../ui/Button';
import Card from '../ui/Card';
import type { Skill } from '../../types';

const InteractiveSkillsSection: React.FC = () => {
  const { user, refreshUserData } = useAuth();
  const toast = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'endorsements' | 'recent'>('endorsements');
  const [filterLevel, setFilterLevel] = useState<'all' | 'beginner' | 'intermediate' | 'expert'>('all');
  const [endorsingSkills, setEndorsingSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const skillsData = await apiService.getSkills();
      setSkills(skillsData);
    } catch (error) {
      toast.error('Failed to load skills');
      console.error('Failed to load skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    try {
      const addedSkill = await apiService.addSkill(newSkill.trim());
      setSkills(prev => [...prev, addedSkill]);
      setNewSkill('');
      setShowAddSkill(false);
      toast.success(`Added ${addedSkill.name} skill!`);
      refreshUserData?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add skill';
      toast.error(message);
    }
  };

  const handleEndorseSkill = async (skill: Skill) => {
    if (endorsingSkills.has(skill.id)) return;

    try {
      setEndorsingSkills(prev => new Set(prev).add(skill.id));
      const updatedSkill = await apiService.endorseSkill(skill.id);
      
      setSkills(prev => 
        prev.map(s => s.id === skill.id ? updatedSkill : s)
      );

      // Emit real-time event
      webSocketService.emitSkillEndorsed(skill.id, skill.userId, skill.name);
      
      toast.success(`Endorsed ${skill.name}!`);
      refreshUserData?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to endorse skill';
      toast.error(message);
    } finally {
      setEndorsingSkills(prev => {
        const newSet = new Set(prev);
        newSet.delete(skill.id);
        return newSet;
      });
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      await apiService.deleteSkill(skillId);
      setSkills(prev => prev.filter(s => s.id !== skillId));
      toast.success('Skill removed successfully');
      refreshUserData?.();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete skill';
      toast.error(message);
    }
  };

  const getSkillLevel = (endorsementCount: number) => {
    if (endorsementCount >= 40) return 'expert';
    if (endorsementCount >= 20) return 'intermediate';
    return 'beginner';
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const filteredAndSortedSkills = skills
    .filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterLevel === 'all' || getSkillLevel(skill.endorsementCount) === filterLevel;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'endorsements':
        default:
          return b.endorsementCount - a.endorsementCount;
      }
    });

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Skills & Expertise
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {skills.length} skills • {skills.reduce((sum, skill) => sum + skill.endorsementCount, 0)} total endorsements
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setShowAddSkill(true)}
        >
          Add Skill
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="endorsements">Most Endorsed</option>
            <option value="name">Alphabetical</option>
            <option value="recent">Recently Added</option>
          </select>
          
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as any)}
            className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      {/* Add Skill Form */}
      <AnimatePresence>
        {showAddSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg border border-primary-200 dark:border-primary-800"
          >
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Add New Skill
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill name (e.g., React, Python, UI Design)"
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
                onClick={() => {
                  setShowAddSkill(false);
                  setNewSkill('');
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedSkills.map((skill, index) => {
            const level = getSkillLevel(skill.endorsementCount);
            const isEndorsing = endorsingSkills.has(skill.id);
            const maxEndorsements = Math.max(...skills.map(s => s.endorsementCount));
            const progressWidth = maxEndorsements > 0 ? (skill.endorsementCount / maxEndorsements) * 100 : 0;

            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Card
                  hover
                  glass
                  padding="sm"
                  className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
                >
                  {/* Skill Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">
                        {skill.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getSkillLevelColor(level)}`}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </span>
                        {level === 'expert' && <Star size={12} className="text-yellow-500" />}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEndorseSkill(skill)}
                        disabled={isEndorsing}
                        className={`p-1.5 rounded-full transition-colors ${
                          isEndorsing
                            ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                            : 'hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-400 hover:text-primary-500'
                        }`}
                      >
                        <ThumbsUp size={14} className={isEndorsing ? 'animate-pulse' : ''} />
                      </motion.button>
                      
                      {user?.id === skill.userId && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Endorsement Count */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>{skill.endorsementCount} endorsements</span>
                      <span>{progressWidth.toFixed(0)}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressWidth}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full rounded-full ${
                          level === 'expert' 
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : level === 'intermediate'
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                            : 'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Skill Stats */}
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Added {new Date(skill.createdAt).toLocaleDateString()}
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* Empty State */}
      {filteredAndSortedSkills.length === 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          {searchQuery || filterLevel !== 'all' ? (
            <>
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No skills found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterLevel('all');
                }}
              >
                Clear Filters
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </motion.div>
      )}
    </Card>
  );
};

export default memo(InteractiveSkillsSection);