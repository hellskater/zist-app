import Sidebar from '@/components/dashboard/sidebar';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-10 pt-24 flex gap-20">
      <section className="w-[20%]">
        <Sidebar />
      </section>

      <main className="w-[80%]">{children}</main>
    </div>
  );
}
