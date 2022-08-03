// import { Role } from '@prisma/client';
import { withAuth } from 'next-auth/middleware';
// import { default } from 'next-auth/middleware';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextResponse } from 'next/server';

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
  /*   callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === '/admin') {
        return token?.role === 'ADMIN';
      }
      // `/my` only requires the user to be logged in
      return !!token;
    },
  }, */
});

// export const config = { matcher: ['/admin', '/my'] };
