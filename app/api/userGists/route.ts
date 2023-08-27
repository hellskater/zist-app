import { NextRequest, NextResponse } from 'next/server';

import { Gist } from '@/lib/types/gist';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get('username');
  const page = searchParams.get('page');

  const res = await fetch(
    `https://api.github.com/users/${username}/gists?page=` +
      page +
      `&timestamp=${Date.now()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    }
  );

  if (res.ok) {
    const gists = await res.json();

    return NextResponse.json(gists as Gist[]);
  }

  return NextResponse.error();
}
