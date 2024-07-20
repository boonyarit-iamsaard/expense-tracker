import { ReactNode } from 'react';

import { SiteHeader } from '@/components/site-header';

type AppLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      {/* SITE FOOTER */}
    </>
  );
}
