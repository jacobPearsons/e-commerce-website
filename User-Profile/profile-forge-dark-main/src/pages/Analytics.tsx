import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Download,
  Filter,
  TrendingUp,
  Users,
  Eye,
  MessageSquare,
  Share2,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

// Mock data for analytics
const timeSeriesData = [
  { date: '2024-01-01', views: 120, engagements: 45, followers: 890 },
  { date: '2024-01-02', views: 132, engagements: 52, followers: 895 },
  { date: '2024-01-03', views: 101, engagements: 38, followers: 892 },
  { date: '2024-01-04', views: 164, engagements: 71, followers: 898 },
  { date: '2024-01-05', views: 189, engagements: 84, followers: 905 },
  { date: '2024-01-06', views: 178, engagements: 67, followers: 910 },
  { date: '2024-01-07', views: 156, engagements: 59, followers: 915 },
];

const demographicsData = [
  { name: '18-24', value: 25, color: '#3B82F6' },
  { name: '25-34', value: 35, color: '#10B981' },
  { name: '35-44', value: 20, color: '#8B5CF6' },
  { name: '45-54', value: 15, color: '#F59E0B' },
  { name: '55+', value: 5, color: '#EF4444' },
];

const skillsRadarData = [
  { skill: 'Design', value: 90 },
  { skill: 'Development', value: 75 },
  { skill: 'Research', value: 85 },
  { skill: 'Strategy', value: 80 },
  { skill: 'Leadership', value: 88 },
  { skill: 'Communication', value: 92 },
];

const topContent = [
  { title: 'Product Design Case Study', views: 1247, engagements: 156, date: '2024-01-05' },
  { title: 'UX Research Insights', views: 987, engagements: 132, date: '2024-01-03' },
  { title: 'Design System Guidelines', views: 856, engagements: 98, date: '2024-01-01' },
  { title: 'User Interview Findings', views: 743, engagements: 87, date: '2024-01-07' },
];

const kpiData = [
  {
    title: 'Total Profile Views',
    value: '12.5K',
    change: 18.2,
    trend: 'up',
    icon: Eye,
    description: 'vs last month'
  },
  {
    title: 'Engagement Rate',
    value: '8.4%',
    change: -2.1,
    trend: 'down',
    icon: Activity,
    description: 'vs last month'
  },
  {
    title: 'New Followers',
    value: '156',
    change: 23.5,
    trend: 'up',
    icon: Users,
    description: 'this month'
  },
  {
    title: 'Content Shares',
    value: '89',
    change: 12.8,
    trend: 'up',
    icon: Share2,
    description: 'this month'
  },
];

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  const exportData = (format: 'csv' | 'json') => {
    // Mock export functionality
    console.log(`Exporting data as ${format.toUpperCase()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your profile performance and engagement.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportData('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="widget-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className="text-xs text-muted-foreground">{kpi.description}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{Math.abs(kpi.change)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Views Trend */}
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Profile Views Trend</CardTitle>
                <CardDescription>Daily profile views over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--chart-primary))"
                      fill="hsl(var(--chart-primary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Overview */}
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>Daily engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="engagements"
                      stroke="hsl(var(--chart-secondary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--chart-secondary))', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Skills Radar Chart */}
          <Card className="widget-card">
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Your skill levels based on endorsements and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: 'hsl(var(--foreground))' }} />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="hsl(var(--chart-primary))"
                    fill="hsl(var(--chart-primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Engagement Rate */}
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Engagement Rate Trend</CardTitle>
                <CardDescription>Percentage of viewers who engaged with your content</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="engagements"
                      stroke="hsl(var(--chart-tertiary))"
                      fill="hsl(var(--chart-tertiary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Performing Content */}
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Your most engaging content pieces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContent.map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-accent/20 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{content.title}</h4>
                        <p className="text-xs text-muted-foreground">{content.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{content.views} views</p>
                        <p className="text-xs text-muted-foreground">{content.engagements} engagements</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics */}
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
                <CardDescription>Age distribution of your audience</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {demographicsData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Follower Growth */}
            <Card className="widget-card">
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
                <CardDescription>Your follower count over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="followers"
                      stroke="hsl(var(--chart-quaternary))"
                      fill="hsl(var(--chart-quaternary))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* Content Performance */}
          <Card className="widget-card">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Detailed breakdown of your content engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div key={index} className="p-4 border border-glass-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{content.title}</h4>
                      <Badge variant="outline">{content.date}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-medium">{content.views}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engagements</p>
                        <p className="font-medium">{content.engagements}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engagement Rate</p>
                        <p className="font-medium">{((content.engagements / content.views) * 100).toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Analytics;