import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { WidgetsGrid } from '../components/dashboard/WidgetsGrid';
import { QuickActions } from '../components/dashboard/QuickActions';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Widget } from '@/types/dashboard';

// Define default widgets here
const defaultWidgets: Widget[] = [
  { id: '1', title: 'Profile Views', type: 'metric', size: 'sm' },
  { id: '2', title: 'Engagement Rate', type: 'metric', size: 'sm' },
  { id: '3', title: 'Followers', type: 'metric', size: 'sm' },
  { id: '4', title: 'Analytics Score', type: 'metric', size: 'sm' },
  { id: '5', title: 'Performance Trends', type: 'chart', size: 'lg' },
  { id: '6', title: 'Traffic Sources', type: 'pie', size: 'md' },
  { id: '7', title: 'Recent Activity', type: 'activity', size: 'md' },
];

 const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(defaultWidgets);
  const { metrics, chartData, pieData, activities, loading } = useDashboardData();

  const moveWidget = (dragIndex: number, hoverIndex: number) => {
    const newWidgets = [...widgets];
    const [draggedWidget] = newWidgets.splice(dragIndex, 1);
    newWidgets.splice(hoverIndex, 0, draggedWidget);
    setWidgets(newWidgets);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6 p-6"
      >
        <DashboardHeader />
        <WidgetsGrid 
          widgets={widgets} 
          metrics={metrics}
          chartData={chartData}
          pieData={pieData}
          activities={activities}
          onMoveWidget={moveWidget}
        />
        <QuickActions />
      </motion.div>
    </DndProvider>
  );
};

export default Dashboard;