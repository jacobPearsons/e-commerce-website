import { Calendar, BarChart3, Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTelegram } from '../../hooks/useTelegram';
import { useTheme } from '../../hooks/useTheme';

export const DashboardHeader = () => {
  const { isConnected, connectTelegram } = useTelegram();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here's what's happening with your profile.
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="hidden sm:flex"
        >
          {isDark ? '☀️' : '🌙'}
        </Button>

        {/* Telegram Connection */}
        {!isConnected && (
          <Button
            variant="outline"
            size="sm"
            onClick={connectTelegram}
            className="hidden md:flex"
          >
            <Bell className="h-4 w-4 mr-2" />
            Connect Telegram
          </Button>
        )}

        {/* Date Filter */}
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Last 7 days
        </Button>

        {/* Analytics Button */}
        <Button size="sm">
          <BarChart3 className="h-4 w-4 mr-2" />
          View Analytics
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};