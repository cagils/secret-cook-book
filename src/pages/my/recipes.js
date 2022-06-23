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
import { Recipes } from '../../components/recipe/Recipes';

enableAllPlugins();

export default function RecipesPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <Box>
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
        <Recipes />
      </Box>
    </Box>
  );
}

RecipesPage.getLayout = (page) => {
  return page;
};
