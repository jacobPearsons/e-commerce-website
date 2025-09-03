export interface Widget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'activity' | 'pie';
  size: 'sm' | 'md' | 'lg';
  data?: any;
}

export interface Metric {
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  unit?: string;
}

export interface ChartData {
  name: string;
  views: number;
  engagement: number;
  [key: string]: any;
}

export interface PieData {
  name: string;
  value: number;
  color: string;
}

export interface Activity {
  id: string;
  type: string;
  user: string;
  time: string;
  avatar: string;
}