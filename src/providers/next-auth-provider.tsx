'use client';

import { ReactNode } from 'react';

import { SessionProvider } from 'next-auth/react';

type NextAuthProviderProps = {
  children: ReactNode;
};

export function NextAuthProvider({ children }: NextAuthProviderProps) {
  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      {children}
    </SessionProvider>
  );
}
