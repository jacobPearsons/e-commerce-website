import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Metric, ChartData, PieData, Activity } from '@/types/dashboard';
import { Eye, Activity as ActivityIcon, Users, TrendingUp } from 'lucide-react';

// Default metrics for fallback
const defaultMetrics: Metric[] = [
  { name: 'Profile Views', value: 1247, change: 12.5, trend: 'up', icon: Eye },
  { name: 'Engagement Rate', value: 8.4, change: -2.1, trend: 'down', icon: ActivityIcon, unit: '%' },
  { name: 'Followers', value: 892, change: 18.2, trend: 'up', icon: Users },
  { name: 'Analytics Score', value: 94, change: 5.8, trend: 'up', icon: TrendingUp, unit: '/100' },
];

const defaultChartData: ChartData[] = [
  { name: 'Jan', views: 400, engagement: 240 },
  { name: 'Feb', views: 300, engagement: 138 },
  { name: 'Mar', views: 200, engagement: 980 },
  { name: 'Apr', views: 278, engagement: 390 },
  { name: 'May', views: 189, engagement: 480 },
  { name: 'Jun', views: 239, engagement: 380 },
  { name: 'Jul', views: 349, engagement: 430 },
];

const defaultPieData: PieData[] = [
  { name: 'Direct', value: 45, color: 'hsl(var(--chart-primary))' },
  { name: 'Social', value: 30, color: 'hsl(var(--chart-secondary))' },
  { name: 'Search', value: 15, color: 'hsl(var(--chart-tertiary))' },
  { name: 'Other', value: 10, color: 'hsl(var(--chart-quaternary))' },
];

const defaultActivities: Activity[] = [
  { id: '1', type: 'profile_view', user: 'Sarah Johnson', time: '2 hours ago', avatar: '' },
  { id: '2', type: 'skill_endorsement', user: 'Mike Chen', time: '4 hours ago', avatar: '' },
  { id: '3', type: 'message', user: 'Emma Davis', time: '6 hours ago', avatar: '' },
  { id: '4', type: 'connection', user: 'Alex Rodriguez', time: '1 day ago', avatar: '' },
];

export const useDashboardData = () => {
  const [data, setData] = useState({
    metrics: [] as Metric[],
    chartData: [] as ChartData[],
    pieData: [] as PieData[],
    activities: [] as Activity[],
    loading: true
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch real data from API
        const [metrics, analytics, activities] = await Promise.allSettled([
          api.getMetrics(),
          api.getAnalytics(),
          api.getRecentActivities()
        ]);

        setData({
          metrics: metrics.status === 'fulfilled' ? metrics.value : defaultMetrics,
          chartData: analytics.status === 'fulfilled' ? analytics.value.chartData : defaultChartData,
          pieData: analytics.status === 'fulfilled' ? analytics.value.pieData : defaultPieData,
          activities: activities.status === 'fulfilled' ? activities.value : defaultActivities,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        // Fallback to default data
        setData({
          metrics: defaultMetrics,
          chartData: defaultChartData,
          pieData: defaultPieData,
          activities: defaultActivities,
          loading: false
        });
      }
    };

    fetchData();
  }, []);

  return data;
};