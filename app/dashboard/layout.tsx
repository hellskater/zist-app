/* eslint-disable @next/next/no-img-element */
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
      <a
        href="https://www.producthunt.com/posts/zist?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-zist"
        target="_blank"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=412240&theme=dark"
          alt="Zist - Effortlessly&#0032;create&#0032;and&#0032;organize&#0032;snippets&#0032;&#0038;&#0032;GitHub&#0032;gists | Product Hunt"
          className="w-250px h-54p fixed bottom-10 right-3"
        />
      </a>
    </div>
  );
}
