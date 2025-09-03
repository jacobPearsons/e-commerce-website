import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/20 bg-white/20 dark:border-gray-600/30 dark:bg-gray-600/20',
        'backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
};