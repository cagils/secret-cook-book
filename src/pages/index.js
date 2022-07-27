import { Box, Button, Flex, useColorMode } from '@chakra-ui/react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import { Layout } from '../layouts/Layout';

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
  }

  return {
    props: {},
  };
}

export default function IndexPage() {
  const { colorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <Flex align="center" justify="center">
      <Box>
        <Link href={`/my/recipes/`}>
          <a>
            <Button variant="solid">Go to My Secret Recipes</Button>
          </a>
        </Link>
      </Box>
    </Flex>
  );
}

IndexPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
