import { Box } from '@chakra-ui/react';
import { User } from '@supabase/gotrue-js';
import { Auth } from '@supabase/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoginForm } from '../../components/auth/LoginForm';
import { Layout } from '../../layouts/Layout';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        provider: 'google',
      });
      if (error) throw error;
      //alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="full">
      <LoginForm handleLogin={handleLogin} loading={loading} />
      <Auth providers={['google', 'github']} supabaseClient={supabase} />
    </Box>
  );
}

LoginPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
