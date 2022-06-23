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
import { Recipe } from '../components/recipe/Recipe';

enableAllPlugins();

export default function IndexPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  const recipeId = 'scb0001';

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
        <Link href={`/my/recipes/`}>
          <a>Go to My Secret Recipes</a>
        </Link>
      </Box>
    </Container>
  );
}

IndexPage.getLayout = (page) => {
  return page;
};