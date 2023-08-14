import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import ClientProviders from '@/components/providers';

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
      <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
