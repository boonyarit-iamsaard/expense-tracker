import '@/styles/globals.css';

import { ReactNode } from 'react';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '@/trpc/react';

import { cn } from '@/libs/utils/cn';
import { fontSans } from '@/libs/utils/fonts';

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export const metadata: Metadata = {
  title: 'Expense Tracker App',
  description: 'A simple expense tracker app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
