import { useClickable } from '@chakra-ui/clickable';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Square,
  Text,
  useColorMode,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RecipeCard } from './RecipeCard';

export const Recipes = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const clickable = useClickable();

  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  useEffect(() => {
    console.log('user' + JSON.stringify(user, undefined, 2));
    let abort = false;
    setLoading(true);

    try {
      const loadRecipes = async () => {
        const fetchUrl = `/api/recipes/?userId=${user.id}`;
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
      };

      loadRecipes();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
    return () => {
      abort = true;
    };
  }, [user]);

  return (
    <Flex p={2} width="full">
      <VStack width="full">
        <Heading size="md">
          <Flex>
            <Square>
              {loading && (
                <Spinner
                  //thickness="4px"
                  //speed="0.65s"
                  //emptyColor="gray.200"
                  color={mode('pink.300', 'pink.600')}
                  size="xl"
                />
              )}
            </Square>
          </Flex>
        </Heading>
        <Flex
          grow="1"
          width="full"
          // border="1px solid red"
          align="center"
          justify="center"
        >
          <Grid
            // flex="1"
            // alignSelf="center"
            templateColumns="repeat(auto-fit, minmax(20rem, 30rem));"
            gap={6}
            // autoRows="1fr"
            // align="center"
            // justify="center"
            justifyContent="center"
            alignContent="center"
            m="auto"
            width="full"
          >
            {recipes.map((recipe) => (
              <GridItem
                key={recipe.recipeId}
                maxH="40rem"
                // border="1px solid red"
              >
                <RecipeCard recipe={recipe} />
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </VStack>
    </Flex>
  );
};
