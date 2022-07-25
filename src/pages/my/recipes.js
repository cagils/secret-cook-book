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
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Recipes } from '../../components/recipe/Recipes';
import { Layout } from '../../layouts/Layout';

enableAllPlugins();

export default function RecipesPage() {
  const { data: session, status } = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const dark = colorMode === 'dark';

  return <Recipes user={session?.user} />;
}

RecipesPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
