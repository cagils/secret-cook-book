import {
  Box,
  Container,
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
import { Recipe } from '../../../components/Recipe/Recipe';

enableAllPlugins();

export default function RecipePage({}) {
  const router = useRouter();
  const { recipeId } = router.query;

  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  return (
    <Container>
      <Box>
        <IconButton
          variant="outline"
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorMode()}
          aria-label="Toggle color scheme"
          icon={<Icon as={dark ? Sun : Moon} />}
        />
      </Box>
      <Heading align="center">
        <Link href="/">
          <a>Secret Cook Book</a>
        </Link>
      </Heading>
      <Box
        m="10px"
        p="20px"
        bg="purple.500"
        borderWidth="1px"
        borderRadius="lg"
        color="purple.50"
      >
        <Recipe editable={true} recipeId={recipeId} />
      </Box>
    </Container>
  );
}

RecipePage.getLayout = (page) => {
  return page;
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
