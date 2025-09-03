import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../ui/Card';

const TopSkillsChart: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();

  if (!user) return null;

  const data = user.skills
    .sort((a, b) => b.endorsementCount - a.endorsementCount)
    .slice(0, 6)
    .map(skill => ({
      name: skill.name,
      endorsements: skill.endorsementCount,
    }));

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Top Skills
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Most endorsed skills
          </p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDark ? '#374151' : '#e5e7eb'} 
            />
            <XAxis 
              dataKey="name" 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#f9fafb' : '#111827',
              }}
            />
            <Bar
              dataKey="endorsements"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TopSkillsChart;