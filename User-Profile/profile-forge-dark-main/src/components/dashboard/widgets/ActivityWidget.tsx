import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity } from '@/types/dashboard';

interface ActivityWidgetProps {
  activities: Activity[];
}

export const ActivityWidget = ({ activities }: ActivityWidgetProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile_view':
        return '👁️';
      case 'skill_endorsement':
        return '⭐';
      case 'message':
        return '💬';
      case 'connection':
        return '🤝';
      default:
        return '📌';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'profile_view':
        return 'text-blue-500';
      case 'skill_endorsement':
        return 'text-yellow-500';
      case 'message':
        return 'text-green-500';
      case 'connection':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 group">
              <div className={`text-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {activity.user}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {activity.type.replace('_', ' ')}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p>No recent activity</p>
              <p className="text-sm">Your activity will appear here</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};