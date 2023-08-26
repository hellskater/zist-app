import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const gistId = searchParams.get('id');

  const res = await fetch(
    `https://api.github.com/gists/${gistId}?timestamp=${Date.now()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    }
  );

  if (res.ok) {
    const gist = await res.json();

    return NextResponse.json(gist);
  }

  return NextResponse.error();
}
