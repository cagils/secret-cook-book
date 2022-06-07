import { Box, Container, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { Recipe } from '../components/Recipe/Recipe';

export default function Home(props) {
  return (
    <Container>
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
        <Recipe />
      </Box>
    </Container>
  );
}

Home.getLayout = (page) => {
  return page;
};
