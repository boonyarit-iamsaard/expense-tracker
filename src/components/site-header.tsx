'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/libs/utils/cn';

export function SiteHeader() {
  const pathname = usePathname();

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
            {pathname?.startsWith('/login') ? null : (
              <Link
                href="/login"
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname?.startsWith('/login')
                    ? 'text-foreground'
                    : 'text-foreground/60',
                )}
              >
                Login
              </Link>
            )}

            <Link
              href="https://github.com/boonyarit-iamsaard/expense-tracker"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'h-8 w-8 px-0',
                )}
              >
                <Icons.gitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
