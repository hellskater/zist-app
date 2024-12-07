/* eslint-disable @next/next/no-img-element */
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
    const res = await axios(
      `https://api.github.com/users/${username}?timestamp=${Date.now()}`
    );
    githubProfile = res.data;
  } catch {
    // if rate limit exceeded, use personal token
    const res = await axios(
      `https://api.github.com/users/${username}?timestamp=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
        },
      }
    );
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
      url: `https://zist-app.vercel.app/user/${username}`,
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
    <div className="p-4 flex gap-10 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <section className="hidden lg:block lg:flex-initial md:w-[20%] lg:w-[20%]">
        <UserProfile username={params?.username} />
      </section>

      <main className="pt-24 pb-8 flex-1 lg:w-[80%] w-full border-b-2 border-yellow-500">
        {children}
      </main>

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
