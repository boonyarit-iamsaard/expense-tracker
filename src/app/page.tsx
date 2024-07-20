import { HydrateClient } from '@/trpc/server';

import { Button } from '@/components/ui/button';

export default async function HomePage() {
  return (
    <HydrateClient>
      <section className="container">
        <div className="mx-auto flex w-full max-w-screen-sm flex-col items-center py-8">
          <Button>Welcome</Button>
        </div>
      </section>
    </HydrateClient>
  );
}
