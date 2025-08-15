import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className={`flex-1 p-3 md:p-6 ${isMobile ? 'ml-0' : ''}`}>
        {children}
      </main>
    </div>
  );
};