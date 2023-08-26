import './styles/globals.css';
import './styles/prosemirror.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ClientProviders from '@/components/providers';
import Header from '@/components/header';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zist: Unleash the Power of Code Snippets with GitHub Gist',
  description:
    'Optimize your coding workflow with Zist, the revolutionary code snippets manager. Save, organize, and access your code snippets effortlessly. Zist syncs with your GitHub gists, making your snippets available directly in VS Code and your browser. Turn coding chaos into clarity with Zist.',
  keywords: [
    'code snippets',
    'snippet manager',
    'code management',
    'programming efficiency',
    'developer tools',
    'coding productivity',
    'code organization',
    'GitHub gists',
    'private repos',
    'VS Code extensions',
    'browser extension for developers',
    'code reuse',
    'coding shortcuts',
    'coding collaboration',
    'code versioning',
    'GitHub Apps',
    'GitHub OAuth',
    'developer workflow',
    'coding workflow',
    'integrated development environment',
    'code bookmarking',
  ],
  authors: [
    {
      name: 'K Srinivas Rao',
      url: 'https://twitter.com/Srinu53168',
    },
    {
      name: 'Millan Sharma',
      url: 'https://github.com/MillanSharma',
    },
  ],
  creator: 'K Srinivas Rao',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zistapp.xyz',
    title: 'Zist: Unleash the Power of Code Snippets with GitHub Gist',
    description:
      'Optimize your coding workflow with Zist, the revolutionary code snippets manager. Save, organize, and access your code snippets effortlessly. Zist syncs with your GitHub gists, making your snippets available directly in VS Code and your browser. Turn coding chaos into clarity with Zist.',
    siteName: 'Zist',
    images: [
      {
        url: 'https://zistapp.xyz/logo.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zist: Unleash the Power of Code Snippets with GitHub Gist',
    description:
      'Optimize your coding workflow with Zist, the revolutionary code snippets manager. Save, organize, and access your code snippets effortlessly. Zist syncs with your GitHub gists, making your snippets available directly in VS Code and your browser. Turn coding chaos into clarity with Zist.',
    images: ['https://zistapp.xyz/logo.png'],
    creator: '@Srinu53168',
  },
  icons: {
    icon: 'favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </head>
      <body className={cn(inter.className, 'overflow-x-hidden')}>
        <ClientProviders>
          <>
            <Header />
            {children}
          </>
        </ClientProviders>
      </body>
    </html>
  );
}
