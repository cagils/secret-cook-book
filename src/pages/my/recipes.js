import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import { enableAllPlugins } from 'immer';
import { getSession, signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Recipes } from '../../components/recipe/Recipes';
import { Layout } from '../../layouts/Layout';

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

export default function RecipesPage() {
  const { data: session, status } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;
  const router = useRouter();

  const handleNewRecipe = async () => {
    const newRecipeId = uuidv4();
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
        userId: `${session?.user.id}`,
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
      throw new Error(`Error: ${response.status}`);
    }
    let res = await response.json();
    router.push(`/my/recipes/${newRecipeId}`);
  };

  return (
    <VStack
      width="full"
      align="center"
      justify="start"
      px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
      pb={4}
      spacing={0}
      gap={4}
    >
      <Box
        boxShadow={mode('base', 'baseWhite')}
        //width="full"
        align="center"
        justify="center"
        bgColor={mode('whiteAlpha.800', 'blackAlpha.500')}
        //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
        borderRadius="lg"
        px={4}
        py={8}
        mt={8}
        width="full"
        //px={16}
        position="relative"
        overflow="hidden"
      >
        {' '}
        <Box>
          <Heading
            as="h2"
            textAlign="center"
            fontFamily="heading"
            fontSize={{
              base: '2em',
              sm: '2.5em',
              md: '3em',
              lg: '3em',
              xl: '4em',
            }}
            color={mode('pink.500', 'pink.200')}
            letterSpacing="wide"
            fontWeight="bold"
            textDecoration="underline"
            textUnderlineOffset={'0.05em'}
            textDecorationThickness="2px"
            textDecorationColor={mode('purple.300', 'purple.400')}
            fontStyle="italic"
            //textTransform={'capitalize'}
          >
            My Secret Recipes
          </Heading>
        </Box>
      </Box>
      <Box
        align="center"
        justfiy="center"
        // flex="1"
        width="full"
        p={{ base: '4px', sm: '6px', md: '8px', xl: '10px' }}
        borderRadius="lg"
        boxShadow={mode('base', 'baseWhite')}
        bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
      >
        <Flex
          flexDir="column"
          borderRadius="lg"
          align="center"
          justify="center"
          boxShadow={mode('inner', 'innerWhite')}
          bgGradient={mode(
            'linear(to-b, pink.200, purple.200)',
            'linear(to-b, pink.800, purple.800)'
          )}
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
            align="stretch"
            justify="center"
            //bgGradient={mode('linear(to-r, purple.50, pink.200)')}
            width="full"
            wrap="wrap-reverse"
            // rowGap={2}
            // columnGap={4}
            gap={4}
          ></Flex>
          <Recipes user={session?.user} />
        </Flex>
      </Box>
    </VStack>
  );
}

RecipesPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
