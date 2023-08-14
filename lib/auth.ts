import { NextAuthOptions, type Profile, type Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { defaultZistConfig } from './constants/configs';

export type CustomSession = {
  accessToken: string;
  user: {
    id: number;
  };
} & Session;

export type CustomProfile = {
  id: number;
} & Profile;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: { params: { scope: 'gist' } },
    }),
  ],

  // push the access token to the session
  callbacks: {
    async signIn({ account }) {
      await markZist(account?.access_token as string);

      return true;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.id = (profile as CustomProfile).id;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      (session as CustomSession).accessToken = token.accessToken as string;
      (session as CustomSession).user.id = token.id as number;

      return session as CustomSession;
    },
  },
};

const markZist = async (accessToken: string) => {
  const allGists = await fetch('https://api.github.com/gists', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  }).then((res) => res.json());

  const zistExists = allGists.find(
    (gist: { description: string }) => gist.description === 'zist.config.json'
  );

  if (zistExists) {
    return;
  }

  await fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      Authorization: `token ${accessToken}`,
    },
    body: JSON.stringify(defaultZistConfig),
  });
};
