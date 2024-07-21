'use client';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function SiteHeader() {
  const { status } = useSession();

  // TODO: improve sign out experience with a loading state and redirect from the protected route

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between space-x-2">
          <Link
            href="/"
            className="text-sm font-bold text-foreground transition-colors hover:text-foreground/80"
          >
            Home
          </Link>

          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {/* TODO: improve this conditional rendering */}
            {status === 'loading' ? (
              <div className="flex h-8 w-8 items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="sr-only">Loading</span>
              </div>
            ) : status === 'unauthenticated' ? (
              <Button asChild variant="ghost" className="h-8">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <Button onClick={() => signOut()} variant="ghost" className="h-8">
                Logout
              </Button>
            )}

            <Button asChild variant="ghost" className="h-8 w-8 px-0">
              <Link
                href="https://github.com/boonyarit-iamsaard/expense-tracker"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
