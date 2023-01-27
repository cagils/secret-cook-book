import { withAuth } from 'next-auth/middleware';

/* export default withAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
    verifyRequest: '/auth/login?verify=true',
  },
}); */

// export { default } from 'next-auth/middleware';
// import { Role } from '@prisma/client';
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// const ROLES_ALLOWED_TO_AUTH = new Set<Role>([Role.ADMIN, Role.USER]);

// export const config = { matcher: ['/my'] };
/* export default withAuth(
  function middleware(req) {
    // Redirect if they don't have the appropriate role
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== Role.ADMIN
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) =>
        token?.role !== undefined && ROLES_ALLOWED_TO_AUTH.has(token.role),
    },
  }
); */

// export function middleware(req, ev) {
//   return withAuth(req, {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   })
// }

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/login',
    verifyRequest: '/auth/login?verify=true',
  },
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname.startsWith('/images')) {
        return true;
      }
      // `/my` only requires the user to be logged in
      return !!token;
    },
  },
});
// export const config = { matcher: ['/admin', '/my'] };
