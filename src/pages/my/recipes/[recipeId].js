import { useColorMode } from '@chakra-ui/react';
import { enableAllPlugins } from 'immer';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Recipe } from '@/components/recipe/Recipe';
import { Layout } from '@/layouts/Layout';

enableAllPlugins();

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function RecipePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { recipeId, fresh } = router.query;

  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  return (
    <Recipe
      initialEditable={fresh == 'true'}
      recipeId={recipeId}
      user={session?.user}
    />
  );
}

RecipePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
