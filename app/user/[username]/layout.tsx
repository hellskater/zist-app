import { Metadata, ResolvingMetadata } from 'next';

import UserProfile from '@/components/user/user-profile';

export async function generateMetadata(
  { params }: { params: { username: string } },
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const username = params.username;

  // fetch data
  const githubProfile = await fetch(
    `https://api.github.com/users/${username}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || [];

  return {
    title: `${githubProfile?.name || githubProfile?.login || 'User'} | Zist`,
    description: githubProfile?.bio,
    openGraph: {
      title: `${githubProfile?.name || githubProfile?.login || 'User'} | Zist`,
      description: githubProfile?.bio,
      url: `https://zistapp.xyz/user/${username}`,
      images: [githubProfile?.avatar_url, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${githubProfile?.name || githubProfile?.login || 'User'} | Zist`,
      description: githubProfile?.bio,
      images: [githubProfile?.avatar_url, ...previousImages],
    },
  };
}

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
