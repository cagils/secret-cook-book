import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue as mode,
  VStack,
} from '@chakra-ui/react';
import { Moon, Sun } from '@styled-icons/feather';
import Link from 'next/link';
import { Layout } from '../layouts/Layout';

export default function IndexPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <Box>
      <Link href={`/my/recipes/`}>
        <a>
          <Button variant="solid" colorScheme="pink">
            Go to My Secret Recipes
          </Button>
        </a>
      </Link>
    </Box>
  );
}

IndexPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
