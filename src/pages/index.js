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
  const { colorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return (
    <Flex align="center" justify="center">
      <Box>
        <Link href={`/my/recipes/`}>
          <a>
            <Button variant="solid">Go to My Secret Recipes</Button>
          </a>
        </Link>
      </Box>
    </Flex>
  );
}

IndexPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
