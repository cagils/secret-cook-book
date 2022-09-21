import { Box, Button, Flex, Heading, useColorMode, VStack } from '@chakra-ui/react';
import { enableAllPlugins } from 'immer';
import { nanoid } from 'nanoid';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { OverlayFader } from '@/components/helpers/OverlayFader';
import { Recipes } from '@/components/recipe/Recipes';
import { SCBHeading } from '@/components/shared/SCBHeading';
import { Layout } from '@/layouts/Layout';

enableAllPlugins();

/* export async function getServerSideProps(context) {
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
} */

export default function RecipesPage() {
  const { data: session, status } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(session?.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user.email !== user?.email) {
      setUser(session?.user);
    } else {
      console.log('session updated but same user');
    }
  }, [session, user]);

  useEffect(() => {
    if (!user?.id) return;
    console.log('user' + JSON.stringify(user, undefined, 2));
    let abort = false;
    setLoading(true);

    try {
      const loadRecipes = async () => {
        const fetchUrl = `/api/recipes/?userId=${session?.user?.email}`;
        console.log(`fetching ${fetchUrl}`);
        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        console.log('fetched.');

        if (abort) return;
        let res = await response.json();
        setRecipes(res.data);
        setLoading(false);
      };

      loadRecipes();
    } catch (e) {
      console.log(e);
    }

    return () => {
      abort = true;
    };
  }, [user]);

  const handleNewRecipe = async () => {
    setLoading(true);
    const newRecipeId = nanoid();
    //TODO: check for collision
    const fetchUrl = `/api/recipes`;
    console.log(`post new recipe to ${fetchUrl}`);
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: `${newRecipeId}`,
        userId: `${session?.user?.email}`,
        photo: '',
        title: '',
        shortDesc: '',
        serving: 0,
        difficulty: 0,
        time: 0,
        ingredients: [
          {
            groupName: 'default',
            list: [],
          },
        ],
        description: {
          html: '',
          json: '',
          text: '',
        },
      }),
    });
    console.log('posted.');

    if (!response.ok) {
      setLoading(false);
      throw new Error(`Error: ${response.status}`);
    }
    let res = await response.json();
    setLoading(false);
    router.push(`/my/recipes/${newRecipeId}?fresh=true`);
  };

  return (
    <VStack
      width="full"
      alignItems="center"
      justifyContent="start"
      px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
      pb={4}
      spacing={0}
      gap={4}
    >
      <Box
        borderRadius="lg"
        alignItems="center"
        bgColor={mode('whiteAlpha.800', 'blackAlpha.500')}
        justifyContent="center"
        boxShadow={mode('base', 'baseWhite')}
        //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
        px={4}
        py={4}
        mt={8}
        width="full"
        position="relative"
        overflow="hidden"
      >
        <Box>
          <SCBHeading>My Secret Recipes</SCBHeading>
        </Box>
      </Box>
      <Box
        alignItems="center"
        justifyContent="center"
        width="full"
        p={{ base: '4px', sm: '6px', md: '8px', xl: '10px' }}
        borderRadius="lg"
        boxShadow={mode('base', 'baseWhite')}
        bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
      >
        <Flex
          flexDir="column"
          borderRadius="lg"
          alignItems="center"
          justifyContent="center"
          boxShadow={mode('inner', 'innerWhite')}
          bgGradient={mode('linear(to-b, pink.200, purple.200)', 'linear(to-b, pink.800, purple.800)')}
          p={{ base: '2px', sm: '4px', md: '6px', xl: '8px' }}
          mb={4}
          minHeight={'20rem'}
          position="relative"
        >
          <Button
            boxShadow={mode('base', 'baseWhite')}
            variant="solid"
            alignSelf="end"
            borderColor={mode('whiteAlpha.900', 'blackAlpha.500')}
            borderWidth={1}
            onClick={handleNewRecipe}
          >
            Create New Recipe
          </Button>
          <Flex
            //width="full"
            alignItems="stretch"
            justifyContent="center"
            width="full"
            wrap="wrap-reverse"
            gap={4}
          ></Flex>
          <OverlayFader active={loading} />
          <Recipes recipes={recipes} loading={loading} />
        </Flex>
      </Box>
    </VStack>
  );
}

RecipesPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
