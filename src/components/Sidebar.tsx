import { Calendar, CheckSquare, Users, BarChart3, Plane, Cloud, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const menuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    href: '/',
  },
  {
    title: 'Agendamentos',
    icon: Calendar,
    href: '/agendamentos',
  },
  {
    title: 'Tarefas',
    icon: CheckSquare,
    href: '/tarefas',
  },
  {
    title: 'Leads',
    icon: Users,
    href: '/leads',
  },
  {
    title: 'Clima',
    icon: Cloud,
    href: '/clima',
  },
];

const SidebarContent = () => {
  const location = useLocation();

  return (
    <div className="bg-card border-border flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg">
            <Plane className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">AgroDrone</h1>
            <p className="text-sm text-muted-foreground">CRM Sistema</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 AgroDrone CRM
        </p>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-64 border-r">
      <SidebarContent />
    </div>
  );
};