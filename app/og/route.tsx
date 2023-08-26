import { ImageResponse } from 'next/server';
import { NextRequest } from 'next/server';
import axios from 'axios';

import CodePreview from '@/components/preview/code-preview';
import { Gist } from '@/lib/types/gist';
import { extensionToLanguage } from '@/lib/constants/language';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const gistId = searchParams.get('gistId');

  let gistData: Gist | null = null;
  let gistFileData: string | null = null;
  try {
    const res = await axios(`https://api.github.com/gists/${gistId}`);
    gistData = res.data;
  } catch {
    // if rate limit exceeded, use personal token
    const res = await axios(`https://api.github.com/gists/${gistId}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    });
    gistData = res.data;
  }

  const gistUrl = gistData?.files[Object.keys(gistData?.files)[0]]?.raw_url;

  try {
    const res = await axios(gistUrl as string);
    gistFileData = res.data;
  } catch {
    // if rate limit exceeded, use personal token
    const res = await axios(gistUrl as string, {
      headers: {
        Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
      },
    });
    gistFileData = res.data;
  }

  const extension = gistData?.files[Object.keys(gistData?.files)[0]]?.filename
    .split('.')
    .pop();

  const language =
    extensionToLanguage[extension as string] ||
    gistData?.files[Object.keys(gistData?.files)[0]]?.language?.toLowerCase();

  return new ImageResponse(
    (
      <CodePreview
        language={language as string}
        value={gistFileData as string}
        og
      />
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
