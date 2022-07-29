import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';

const options = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
    verifyRequest: '/auth/login',
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log('in session callback,', session, token, user);
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('in jwt user =', user, account, profile, isNewUser);
      console.log(user);
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 40000,
      },
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/auth?response_type=code&prompt=consent',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 40000,
      },
      authorizationUrl:
        'https://github.com/login/oauth/authorize?login=true&response_type=code&  prompt=consent',
    }),
    /* EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 10 * 60, // Magic links are valid for 10 min only
    }), */
  ],
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(options);
