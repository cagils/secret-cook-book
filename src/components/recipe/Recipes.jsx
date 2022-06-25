import { useClickable } from '@chakra-ui/clickable';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spinner,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RecipeCard } from './RecipeCard';

export const Recipes = ({ editable, recipeId }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const clickable = useClickable();

  useEffect(() => {
    let abort = false;
    setLoading(true);

    try {
      const loadRecipes = async () => {
        const fetchUrl = `/api/my/recipes/`;
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
  }, []);

  return (
    <Container p={2}>
      <VStack>
        <Heading size="md">
          <Flex>
            <Text>My Secret Recipes</Text>
            <Square>{loading && <Spinner />}</Square>
          </Flex>
        </Heading>
        <Box>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.recipeId} recipe={recipe} />
          ))}
        </Box>
      </VStack>
    </Container>
  );
};
