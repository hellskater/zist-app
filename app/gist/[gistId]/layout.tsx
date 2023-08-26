'use client';

import { Metadata } from 'next';

import UserProfile from '@/components/user/user-profile';
import { useGetGistById } from '@/lib/hooks/useGists';

export const metadata: Metadata = {
  title: 'Gist | Zist',
};

export default function GistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gistId: string };
}) {
  const { data: gistData, isPending: isGistLoading } = useGetGistById(
    params?.gistId
  );

  if (!isGistLoading && !gistData) {
    return (
      <div>
        <p>Gist not found</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex gap-10 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <section className="hidden lg:block lg:flex-initial md:w-[20%] lg:w-[20%]">
        <UserProfile username={gistData?.owner?.login as string} />
      </section>

      <main className="pt-24 flex-1 lg:w-[80%] w-full">{children}</main>
    </div>
  );
}
