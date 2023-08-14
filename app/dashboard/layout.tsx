export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-10">{children}</div>;
}
