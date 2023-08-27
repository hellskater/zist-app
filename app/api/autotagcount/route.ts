import { NextResponse } from 'next/server';

import { getServerSideUserSession } from '@/lib/auth';
import { getUser } from '@/lib/queries';

export async function GET() {
  const session = await getServerSideUserSession();
  let dbUser = null;

  if (session?.user?.username) {
    dbUser = await getUser(session?.user?.username);
  }

  if (dbUser) {
    return NextResponse.json(dbUser);
  } else {
    return NextResponse.json({ autotagcount: 0 });
  }
}
