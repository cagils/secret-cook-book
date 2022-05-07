//import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const SidebarLayout = () => {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
    </nav>
  );
};

export default SidebarLayout;
