import { Box, Flex, Image, useColorMode } from '@chakra-ui/react';

export const Photo = ({ photoUrl }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Flex
      borderRadius="lg"
      align="center"
      justify="center"
      boxShadow={mode('inner', 'innerWhite')}
      bgGradient={mode(
        'linear(to-b, pink.200, purple.200)',
        'linear(to-b, pink.800, purple.800)'
      )}
      p={{ base: '2px', sm: '4px', md: '6px', xl: '8px' }}
      mb={4}
    >
      {photoUrl && (
        <Flex
          my={{ base: '2px', sm: '2px', md: '4px', xl: '10px' }}
          align="center"
          justify="center"
          /* w={{
                      xl: '100%',
                      '2xl': '80%',
                      '3xl': '75%',
                    }} */
        >
          <Box
            //m={{ sm: '2px', md: '4px', xl: '6px' }}
            borderRadius="lg"
            //bgColor={mode('whiteAlpha.900', 'blackAlpha.500')}
          >
            <Flex
              align="center"
              justify="center"
              grow="1"
              //bgColor="orange"
              //display="flex"
              //flex="1"
              //pos="relative"
              //css="aspect-ratio: 1 / 1"
              overflow="hidden"
              borderRadius="lg"
              height="auto"
            >
              <Image
                //loading="lazy"
                // sizes="50vw"
                src={photoUrl}
                alt={'Recipe Photo'}
                layout="fill"
                fit="cover"
                width="100%"
                //height="40vh"
                minH="20rem"
                maxH="30rem"
                //htmlHeight="100%"
                //htmlWidth="100%"
                //objectPosition={'50% 50%'}
                //sx={{ aspectRatio: '16 / 9' }}
              />
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};
