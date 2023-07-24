'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div>
        {session ? (
          <Button onClick={() => signOut()} variant="default" size="lg">
            Logout
          </Button>
        ) : (
          <Button onClick={() => signIn('github')} variant="default" size="lg">
            Login
          </Button>
        )}

        <div className="mt-10">
          {session && (
            <div>
              <h1>Session</h1>
              <pre className="mt-10">{JSON.stringify(session, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
