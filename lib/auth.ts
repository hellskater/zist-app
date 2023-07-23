import { NextAuthOptions, type Profile, type Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";

type CustomSession = {
  accessToken: string;
  user: {
    id: number;
  };
} & Session;

type CustomProfile = {
  id: number;
} & Profile;

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
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
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.

      (session as CustomSession).accessToken = token.accessToken as string;
      (session as CustomSession).user.id = token.id as number;

      return session;
    },
  },
};
