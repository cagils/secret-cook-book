import { Flex, Grid, GridItem, useColorMode, VStack } from '@chakra-ui/react';

import { RecipeCard } from '@/components/recipe/RecipeCard';

export const Recipes = ({ recipes, loading }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Flex p={2} width="full">
      <VStack width="full">
        <Flex
          grow="1"
          width="full"
          // border="1px solid red"
          alignItems="center"
          justifyContent="center"
        >
          <Grid
            // flex="1"
            // alignSelf="center"
            templateColumns="repeat(auto-fit, minmax(20rem, 30rem));"
            gap={6}
            // autoRows="1fr"
            // alignItems="center"
            // justifyContent="center"
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
