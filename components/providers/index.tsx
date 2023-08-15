'use client';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import NextAuthProvider from './next-auth-provider';
import ReactQueryProvider from './react-query-provider';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <>{children}</>

        <Toaster position="bottom-center" />
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
