import { Flex } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';

import { Layout } from '@/layouts/Layout';

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/my/recipes',
        permanent: false,
      },
    };
  }
}

export default function IndexPage() {
  return <Flex alignItems="center" justifyContent="center"></Flex>;
}

IndexPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
