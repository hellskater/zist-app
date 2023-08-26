import { Metadata } from 'next';

import Sidebar from '@/components/dashboard/sidebar';

export const metadata: Metadata = {
  title: 'Dashboard | Zist',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-10 pt-24 flex gap-10">
      <section className="w-[20%]">
        <Sidebar />
      </section>

      <main className="w-[80%]">{children}</main>
    </div>
  );
}
