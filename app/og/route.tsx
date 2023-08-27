import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';

import { Gist } from '@/lib/types/gist';

import CodePreview from './preview';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const gistId = searchParams.get('gistId');

  let gistData: Gist | null = null;
  let gistFileData: string | null = null;
  try {
    const res = await fetch(
      `https://api.github.com/gists/${gistId}?timestamp=${Date.now()}`
    );
    gistData = await res.json();
  } catch {
    // if rate limit exceeded, use personal token
    const res = await fetch(
      `https://api.github.com/gists/${gistId}?timestamp=${Date.now()}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
        },
      }
    );
    gistData = await res.json();
  }

  const gistUrl = gistData?.files[Object.keys(gistData?.files)[0]]?.raw_url;

  try {
    const res = await fetch(gistUrl as string);
    gistFileData = await res.text();
  } catch {
    // if rate limit exceeded, use personal token
    const res = await fetch(gistUrl as string, {
      headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    });
    gistFileData = await res.text();
  }

  return new ImageResponse(<CodePreview value={gistFileData as string} />, {
    width: 1920,
    height: 1080,
  });
}
