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
    <div className="p-4 flex gap-10 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <section className="hidden lg:block lg:flex-initial md:w-[20%] lg:w-[20%]">
        <Sidebar />
      </section>
      <main className="pt-24 flex-1 lg:w-[80%] w-full">{children}</main>
    </div>
  );
}
