import { Box } from '@chakra-ui/react';
import { getProviders, getSession, signIn, useSession } from 'next-auth/react';

import { LoginForm } from '@/components/auth/LoginForm';
import { Layout } from '@/layouts/Layout';

export default function LoginPage({ providers }) {
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

  const handleLogin = (providerId) => {
    signIn(providerId);
  };

  return (
    <Box width="full">
      <LoginForm
        providers={providers}
        handleLogin={handleLogin}
        loading={status?.loading}
      />
    </Box>
  );
}

LoginPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
    },
  };
}
