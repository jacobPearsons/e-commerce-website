import { Users, MessageSquare, Award, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

const quickActions = [
  {
    id: 'update-profile',
    label: 'Update Profile',
    icon: Users,
    action: () => console.log('Update profile clicked'),
    variant: 'outline' as const
  },
  {
    id: 'send-message',
    label: 'Send Message',
    icon: MessageSquare,
    action: () => console.log('Send message clicked'),
    variant: 'outline' as const
  },
  {
    id: 'add-skills',
    label: 'Add Skills',
    icon: Award,
    action: () => console.log('Add skills clicked'),
    variant: 'outline' as const
  },
  {
  id: 'export-data',
  label: 'Export Data',
  icon: Download,
  action: async () => {
    try {
      const blob = await api.exportData();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "exported-data.json"); // <-- set filename & extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed:", error);
      throw error; // so toast shows error
    }
  },
  variant: "outline" as const,
}
];

export const QuickActions = () => {
  const { toast } = useToast();

  const handleAction = async (action: () => void | Promise<void>, label: string) => {
    try {
      await action();
      toast({
        title: 'Success',
        description: `${label} action completed successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to complete ${label.toLowerCase()} action.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks to help you manage your profile effectively.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center space-y-2 group hover:scale-105 transition-transform duration-200"
              onClick={() => handleAction(action.action, action.label)}
            >
              <action.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};