import { Box, Heading, Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { Edit } from '@styled-icons/feather';

import { FInput } from '../helpers/form/FInput';

export const RecipeTitle = ({ recipeTitle, editable, loading, handleEdit }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box>
      {!editable ? (
        <Box>
          <Heading
            as="h2"
            textAlign="center"
            fontFamily="heading"
            fontSize={{
              base: '2em',
              sm: '2.5em',
              md: '3em',
              lg: '3em',
              xl: '4em',
            }}
            color={mode('pink.500', 'pink.200')}
            letterSpacing="wide"
            fontWeight="bold"
            textDecoration="underline"
            textUnderlineOffset={'0.05em'}
            textDecorationThickness="2px"
            textDecorationColor={mode('purple.300', 'purple.400')}
            fontStyle="italic"
            //textTransform={'capitalize'}
          >
            {recipeTitle || 'Loading...'}
          </Heading>
          <Box
            m="2"
            position="absolute"
            right={0}
            top={0}
            //px={{ base: '2', sm: '2', md: '4', xl: '5', '2xl': '5' }}
            bottom="unset"
            left="unset"
            zIndex="1000"
          >
            <IconButton
              // width="1.4em"
              // height="1.4em"
              colorScheme="pink"
              // isRound
              aria-label="Edit Recipe"
              variant="ghost"
              // size="2xl"
              icon={<Icon as={Edit} />}
              _hover={{
                bgColor: 'transparent',
                color: mode('pink.300', 'pink.700'),
              }}
              color={mode('pink.200', 'pink.800')}
              onClick={handleEdit}
              // textAlign="center"
              //fontFamily="heading"
              fontSize={{
                base: '2em',
                sm: '2.5em',
                md: '2em',
                lg: '2em',
                xl: '3em',
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <FInput
            autoFocus
            fieldName={`title`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={recipeTitle}
            placeholder="Item name"
            // rest...
            disabled={loading}
            fontSize={{
              base: '2em',
              sm: '2.5em',
              md: '3em',
              lg: '3em',
              xl: '4em',
            }}
            textAlign="center"
            fontFamily="heading"
            color={mode('pink.500', 'pink.200')}
            letterSpacing="wide"
            fontWeight="bold"
            textDecoration="underline"
            textUnderlineOffset={'0.05em'}
            textDecorationThickness="2px"
            textDecorationColor={mode('purple.300', 'purple.400')}
            fontStyle="italic"
            height="1.4em"
            //textTransform={'capitalize'}
          />
        </Box>
      )}
    </Box>
  );
};
