import { Box } from '@chakra-ui/react';
// import { User } from '@supabase/gotrue-js';
// import { Auth } from '@supabase/ui';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LoginForm } from '../../components/auth/LoginForm';
import { Layout } from '../../layouts/Layout';
// import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const { data: session, status } = useSession();
  // const [loading, setLoading] = useState(false);

  /*   const handleSupabaseLogin = async (email) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn(
        {
          provider: 'google',
        },
        {
          redirectTo: 'https://secret-cook-book.vercel.app',
        }
      );
      if (error) throw error;
      //alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }; */

  const handleLogin = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <Box width="full">
      <LoginForm handleLogin={handleLogin} loading={status?.loading} />
    </Box>
  );
}

LoginPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
