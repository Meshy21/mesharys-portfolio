'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4">
        <h2 className="font-headline text-3xl font-bold tracking-tighter text-destructive">Something went wrong!</h2>
        <p className="mx-auto max-w-[500px] text-muted-foreground">
          An unexpected error occurred while rendering this page.
        </p>
        <div className="pt-4">
          <Button onClick={() => reset()} size="lg">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
