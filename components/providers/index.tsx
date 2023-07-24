'use client';

import { ReactNode } from 'react';

import NextAuthProvider from './next-auth-provider';
import ReactQueryProvider from './react-query-provider';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <>{children}</>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
