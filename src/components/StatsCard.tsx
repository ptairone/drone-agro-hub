import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <Card className={`p-4 md:p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1 md:space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">{title}</p>
          <p className="text-xl md:text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={`text-xs md:text-sm flex items-center gap-1 ${
              trend.isPositive ? 'text-success' : 'text-destructive'
            }`}>
              {trend.isPositive ? '+' : ''}{trend.value}
            </p>
          )}
        </div>
        <div className="p-2 md:p-3 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 md:h-6 md:w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};