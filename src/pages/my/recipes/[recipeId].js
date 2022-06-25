import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import { enableAllPlugins } from 'immer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Recipe } from '../../../components/recipe/Recipe';
import { Layout } from '../../../layouts/Layout';

enableAllPlugins();

export default function RecipePage() {
  const router = useRouter();
  const { recipeId } = router.query;

  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  return <Recipe editable={true} recipeId={'scb0001'} />;
}

RecipePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

/* export async function getServerSideProps(context) {  
  return { props: { data: {} } }; // SSR disabled

  const { recipeId } = context.params;
  let res = null;
  let host = null;

  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    host = process.env.NEXT_PUBLIC_VERCEL_URL;
  } else if (process.env.NODE_ENV === 'development') {
    host = 'http://localhost:3000';
  }

  try {
    // Fetch data from external API
    const fetchUrl = `${host}/api/my/recipes/${recipeId}`;
    console.log(`SSR fetching ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    console.log('SSR fetched.');

    res = await response.json();
  } catch (e) {
    console.log(e);
  }

  if (!res?.data) {
    return { notFound: true };
  }

  return { props: { data: res.data } };
} */
