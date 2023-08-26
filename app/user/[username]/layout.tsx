import { Metadata, ResolvingMetadata } from 'next';
import axios from 'axios';

import UserProfile from '@/components/user/user-profile';
import { User } from '@/lib/types/gist';

export async function generateMetadata(
  { params }: { params: { username: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const username = params.username;
  let githubProfile: User | null = null;
  try {
    const res = await axios(`https://api.github.com/users/${username}`);
    githubProfile = res.data;
  } catch {
    // if rate limit exceeded, use personal token
    const res = await axios(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    });
    githubProfile = res.data;
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || [];
  const previousDescription = (await parent)?.description || '';

  return {
    title: `${githubProfile?.name || githubProfile?.login || 'User'} | Zist`,
    description: githubProfile?.bio || previousDescription,
    openGraph: {
      title: `${githubProfile?.name || githubProfile?.login || 'User'} | Zist`,
      description: githubProfile?.bio,
      url: `https://zistapp.xyz/user/${username}`,
      images: [githubProfile?.avatar_url as string, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${githubProfile?.name || githubProfile?.login || 'User'} | Zist`,
      description: githubProfile?.bio || previousDescription,
      images: [githubProfile?.avatar_url as string, ...previousImages],
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
