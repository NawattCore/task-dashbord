import NextAuth from 'next-auth';
import type { NextAuthConfig, Session, User as NextAuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { JWT } from 'next-auth/jwt';

import { verifyLocalUser } from './local-users';

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
          // Local-only credentials check (dev)
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // In this project, "username" is the email from the form
        const user = verifyLocalUser(
          String(credentials.username),
          String(credentials.password),
        );

        if (!user) return null;

        // NextAuth requires an object with an id
        type AppUser = NextAuthUser & { id: string; role?: string };
        const appUser: AppUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
        return appUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On sign in, persist basic user info into the token
      if (user) {
        const tokenUser: {
          id: string;
          name?: string | null;
          email?: string | null;
          role?: string;
        } = {
          id: (user as { id: string }).id,
          name: user.name,
          email: user.email,
          role: (user as { role?: string }).role,
        };
        (token as JWT & { user?: typeof tokenUser }).user = tokenUser;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose the token user on the session object
      const tokenWithUser = token as JWT & {
        user?: {
          id: string;
          name?: string | null;
          email?: string | null;
          role?: string;
        };
      };
      if (tokenWithUser.user) {
        (session as Session & { user: typeof tokenWithUser.user }).user =
          tokenWithUser.user;
      }
      return session as Session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  trustHost: true,
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
