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
    <div className="p-5 pt-24 flex gap-12">
      <section className="w-[20%]">
        <UserProfile username={gistData?.owner?.login as string} />
      </section>

      <main className="w-[80%]">{children}</main>
    </div>
  );
}
