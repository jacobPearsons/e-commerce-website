import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Metric } from '../../../types/dashboard';

interface MetricWidgetProps {
  metric: Metric;
}

export const MetricWidget = ({ metric }: MetricWidgetProps) => {
  const IconComponent = metric.icon;
  
  return (
    <Card className="glass-card hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
              <p className="text-2xl font-bold">
                {metric.value}{metric.unit || ''}
              </p>
            </div>
          </div>
          <div className={`flex items-center space-x-1 ${
            metric.trend === 'up' ? 'text-green-600' : 'text-red-500'
          }`}>
            {metric.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{Math.abs(metric.change)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};