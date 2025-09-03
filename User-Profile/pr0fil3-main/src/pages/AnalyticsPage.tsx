import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Filter } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import { mockAnalyticsData } from '../data/mockData';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AnalyticsPage: React.FC = () => {
  const { isDark } = useTheme();
  const [dateRange, setDateRange] = useState('30d');

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const pieData = mockAnalyticsData.skillEndorsements.slice(0, 6);
  const engagementData = mockAnalyticsData.engagement;
  const profileViewsData = mockAnalyticsData.profileViews;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed insights into your profile performance and engagement.
          </p>
        </div>
        
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" icon={Filter} size="sm">
            Filter
          </Button>
          <Button variant="outline" icon={Calendar} size="sm">
            Date Range
          </Button>
          <Button variant="primary" icon={Download} size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <Card glass padding="sm">
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === range
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {range === '7d' && 'Last 7 days'}
              {range === '30d' && 'Last 30 days'}
              {range === '90d' && 'Last 3 months'}
              {range === '1y' && 'Last year'}
            </button>
          ))}
        </div>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Views Trend */}
        <Card>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Profile Views Trend
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Daily profile views over time
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={profileViewsData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDark ? '#374151' : '#e5e7eb'} 
                />
                <XAxis 
                  dataKey="date" 
                  stroke={isDark ? '#9ca3af' : '#6b7280'}
                  fontSize={12}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                  }}
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
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  fill="url(#colorViews)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Skill Endorsements Distribution */}
        <Card>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Skill Endorsements
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Distribution of endorsements by skill
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '8px',
                    color: isDark ? '#f9fafb' : '#111827',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.skill} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.skill}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Engagement Overview */}
      <Card>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Weekly Engagement
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total interactions and engagement over the past week
          </p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={isDark ? '#374151' : '#e5e7eb'} 
              />
              <XAxis 
                dataKey="date" 
                stroke={isDark ? '#9ca3af' : '#6b7280'}
                fontSize={12}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', { weekday: 'short' });
                }}
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
              <Line
                type="monotone"
                dataKey="interactions"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnalyticsPage;