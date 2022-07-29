import { Box } from '@chakra-ui/react';
import { getProviders, getSession, signIn, useSession } from 'next-auth/react';

import { LoginForm } from '@/components/auth/LoginForm';
import { Layout } from '@/layouts/Layout';
import { useRouter } from 'next/router';

export default function LoginPage({ providers }) {
  const { data: session, status } = useSession();
  const { error, verify } = useRouter().query;

  const handleLogin = (providerId, email) => {
    console.log('email=', email);
    if (email) signIn(providerId, { email });
    else signIn(providerId);
  };
  return (
    <Box width="full">
      <LoginForm
        error={error}
        verify={verify}
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
