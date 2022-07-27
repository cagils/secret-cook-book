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
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Recipe } from '../../../components/recipe/Recipe';
import { Layout } from '../../../layouts/Layout';
import { baseHost } from '../../../lib/siteConfig';
import { supabase } from '../../../lib/supabase';

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

  if (typeof window !== 'undefined') {
    // if (!user) {
    //   router.push('/auth/login');
    // }
  }

  const { recipeId } = router.query;

  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  return (
    <Recipe initialEditable={false} recipeId={recipeId} user={session?.user} />
  );
}

RecipePage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

/* export async function getServerSideProps(context) {  
  return { props: { data: {} } }; // SSR disabled

  const { recipeId } = context.params;
  let res = null;

  try {
    // Fetch data from external API
    const fetchUrl = `${baseHost}/api/recipes/${recipeId}`;
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

/* export const getServerSideProps = async ({
  query,
  params,
  req,
  resolvedUrl,
}) => {
  const domain = req.headers.host;
  const pathName = 'https://' + domain + resolvedUrl;
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    if (resolvedUrl !== 'auth/login')
      return { props: {}, redirect: { destination: '/auth/login' } };
  }
  return { props: { user } };
}; */

/* 
export async function getServerSideProps() {
  // We need to implement `/api/getUser` by creating
  // an endpoint in `pages/api` but for now let's just call it
  const response = await fetch(`${baseHost}/api/auth/user`).then((response) =>
    response.json()
  );

  const { user } = response;

  // If the `getUser` endpoint doesn't have a user in its response
  // then we will redirect to the login page
  // which means this page will only be viewable when `getUser` returns a user.

  if (!user) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }
  // We'll pass the returned `user` to the page's React Component as a prop
  return { props: { user } };
} */
