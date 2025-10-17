'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import useDashboard from '@/store/dashboard';
import Dashboard from '@/components/dashboard/Dashboard';
import Products from '@/components/dashboard/Products';

export default function Page() {
  const currentPage = useDashboard((state) => state.currentPage);

  const pageMap: Record<string, React.ElementType> = {
    Dashboard,
    Products,
  };

  const PageComponent = pageMap[currentPage] || (() => <p>Page not found</p>);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <PageComponent />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
