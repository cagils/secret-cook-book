import { Recipe } from '../components/Recipe/Recipe';
import { Moon, Sun } from '@styled-icons/feather';
import { Box, Icon, IconButton, useColorMode } from '@chakra-ui/react';

export const CreateRecipePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <Box>
      <IconButton
        variant="outline"
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorMode()}
        aria-label="Toggle color scheme"
        icon={<Icon as={dark ? Sun : Moon} />}
      />
      <Recipe mode="edit" recipeId="scb0001" />;
    </Box>
  );
};

CreateRecipePage.getLayout = (page) => {
  return page;
};
