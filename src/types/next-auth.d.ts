import { Role } from '@prisma/client';
import { DefaultSession } from 'next-auth';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string;
    provider?: string;
    role?: Role;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context and trpc context
   */
  interface Session {
    user?: {
      id?: string;
      provider?: string;
      role?: Role;
    } & DefaultSession['user'];
  }

  /** Passed as a parameter to the `jwt` callback */
  interface User {
    role?: Role;
  }
}
