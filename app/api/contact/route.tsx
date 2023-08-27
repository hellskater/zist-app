import { NextRequest, NextResponse } from 'next/server';

import { getServerSideUserSession } from '@/lib/auth';
import { sendDiscordMessage } from '@/lib/queries';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const session = await getServerSideUserSession();

  if (session) {
    await sendDiscordMessage(message, session.user.username);
    return NextResponse.json({
      message: 'Message sent successfully',
    });
  } else {
    return NextResponse.json({
      message: 'You are not logged in',
    });
  }
}
