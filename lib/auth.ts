import {
  NextAuthOptions,
  getServerSession,
  type Profile,
  type Session,
} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export type CustomSession = {
  accessToken: string;
  user: {
    id: number;
    username: string;
  };
} & Session;

export type CustomProfile = {
  id: number;
  login: string;
} & Profile;
//
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
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }

      if (profile) {
        token.id = (profile as CustomProfile).id;
        token.username = (profile as CustomProfile).login;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.

      (session as CustomSession).accessToken = token.accessToken as string;
      (session as CustomSession).user.id = token.id as number;
      (session as CustomSession).user.username = token.username as string;

      return session as CustomSession;
    },
  },
};

export function getServerSideUserSession() {
  return getServerSession(authOptions) as Promise<CustomSession | null>;
}
