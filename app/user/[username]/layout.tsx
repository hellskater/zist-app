import { Metadata } from 'next';

import UserProfile from '@/components/user/user-profile';

export const metadata: Metadata = {
  title: 'User | Zist',
};

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  return (
    <div className="p-5 pt-24 flex gap-12">
      <section className="w-[20%]">
        <UserProfile username={params?.username} />
      </section>

      <main className="w-[80%]">{children}</main>
    </div>
  );
}
