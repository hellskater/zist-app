/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { ResolvingMetadata, Metadata } from 'next';

import UserProfile from '@/components/user/user-profile';
import { Gist } from '@/lib/types/gist';
import { getServerSideUserSession } from '@/lib/auth';
import { getDescription } from '@/lib/hooks/utils';

export async function generateMetadata(
  { params }: { params: { gistId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const gistId = params.gistId;
  let gistData: Gist | null = null;
  try {
    const res = await axios(
      `https://api.github.com/gists/${gistId}?timestamp=${Date.now()}`
    );
    gistData = res.data;
  } catch {
    // if rate limit exceeded, use personal token
    const res = await axios(
      `https://api.github.com/gists/${gistId}?timestamp=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
        },
      }
    );
    gistData = res.data;
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)?.openGraph?.images || [];
  const previousDescription = (await parent)?.description || '';

  const fileName = Object.keys(gistData?.files || {})[0];
  const description = getDescription(gistData?.description || '');

  const ogImage =
    `https://zist-app.vercel.app/og?gistId=${gistId}` ||
    'https://zist-app.vercel.app/og.png';

  return {
    title: `${description || fileName || 'File'} | Zist`,
    description: description || previousDescription,
    openGraph: {
      title: `${description || fileName || 'File'} | Zist`,
      description: description || previousDescription,
      url: `https://zist-app.vercel.app/gist/${gistId}`,
      images: [ogImage, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${description || fileName || 'File'} | Zist`,
      description: description || previousDescription,
      images: [ogImage, ...previousImages],
    },
  };
}

export default async function GistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { gistId: string };
}) {
  const gistId = params.gistId;

  let gistData: Gist | null = null;

  const session = await getServerSideUserSession();

  if (session) {
    try {
      const res = await axios(`https://api.github.com/gists/${gistId}`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      gistData = res.data;
    } catch {}
  } else {
    try {
      const res = await axios(`https://api.github.com/gists/${gistId}`);
      gistData = res.data;
    } catch {
      try {
        // if rate limit exceeded, use personal token
        const res = await axios(`https://api.github.com/gists/${gistId}`, {
          headers: {
            Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
          },
        });
        gistData = res.data;
      } catch {}
    }
  }

  return (
    <div className="p-4 flex gap-10 sm:p-6 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
      <section className="hidden lg:block lg:flex-initial md:w-[20%] lg:w-[20%]">
        <UserProfile username={gistData?.owner?.login as string} />
      </section>

      <main className="pt-24 flex-1 lg:w-[80%] w-full">{children}</main>
    </div>
  );
}
