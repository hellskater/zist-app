import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const username = searchParams.get('username');

  const res = await fetch(
    `https://api.github.com/users/${username}?timestamp=${Date.now()}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    }
  );

  if (res.ok) {
    const userData = await res.json();

    return NextResponse.json(userData);
  }

  return NextResponse.error();
}
