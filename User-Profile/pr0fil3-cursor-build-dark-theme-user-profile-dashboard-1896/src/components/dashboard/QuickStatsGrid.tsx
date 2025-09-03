import React from 'react';
import { Eye, ThumbsUp, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MetricCard from './MetricCard';

const QuickStatsGrid: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Calculate stats
  const totalViews = user.profileViews.length;
  const totalEndorsements = user.skills.reduce((total, skill) => total + skill.endorsementCount, 0);
  const recentViews = user.profileViews.filter(
    view => new Date().getTime() - view.viewedAt.getTime() < 7 * 24 * 60 * 60 * 1000
  ).length;
  const lastWeekViews = user.profileViews.filter(
    view => {
      const daysDiff = Math.floor((new Date().getTime() - view.viewedAt.getTime()) / (1000 * 60 * 60 * 24));
      return daysDiff >= 7 && daysDiff < 14;
    }
  ).length;

  const viewsChange = lastWeekViews > 0 ? ((recentViews - lastWeekViews) / lastWeekViews) * 100 : 0;

  const stats = [
    {
      title: 'Profile Views',
      value: totalViews.toLocaleString(),
      change: {
        value: Math.round(viewsChange),
        label: 'vs last week',
        trend: (viewsChange >= 0 ? 'up' : 'down') as 'up' | 'down',
      },
      icon: Eye,
      color: 'blue' as const,
    },
    {
      title: 'Total Endorsements',
      value: totalEndorsements.toLocaleString(),
      change: {
        value: 12,
        label: 'this month',
        trend: 'up' as 'up' | 'down',
      },
      icon: ThumbsUp,
      color: 'green' as const,
    },
    {
      title: 'Skills',
      value: user.skills.length,
      icon: TrendingUp,
      color: 'purple' as const,
    },
    {
      title: 'Connections',
      value: '1.2K',
      change: {
        value: 8,
        label: 'this week',
        trend: 'up' as 'up' | 'down',
      },
      icon: Users,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <MetricCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default QuickStatsGrid;