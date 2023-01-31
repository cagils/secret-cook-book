import { Box, Flex, Heading, Icon, IconButton, Stack, Text, useColorMode } from '@chakra-ui/react';
import { BarChartAlt2, Dish, TimeFive } from '@styled-icons/boxicons-solid';

import { FInput } from '@src/components/helpers/form/FInput';
import { SCBText } from '@src/components/shared/SCBText';

export const RecipeServingTimeDifficulty = ({ recipeServing, recipeTime, recipeDifficulty, editable, loading }) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);

  return (
    <Stack
      direction={'row'}
      fontSize={{
        base: '1em',
        sm: '1.2em',
        md: '1.4em',
        lg: '2em',
        xl: '2em',
      }}
      placeItems="center"
      color={mode('pink.500', 'pink.200')}
    >
      <Box h="2em">
        <Icon as={Dish} mt="2" />
      </Box>
      {!editable ? (
        <Box>
          <SCBText>{recipeServing || '-'}</SCBText>
        </Box>
      ) : (
        <Box>
          <FInput
            autoFocus
            fieldName={`serving`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={recipeServing}
            placeholder=""
            // rest...
            fontSize="1em"
            disabled={loading}
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
      <Box h="2em">
        <Icon as={TimeFive} mt="2" />
      </Box>
      {!editable ? (
        <Box>
          <SCBText>{recipeTime || '-'}</SCBText>
        </Box>
      ) : (
        <Box>
          <FInput
            autoFocus
            fieldName={`time`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={recipeTime}
            placeholder=""
            // rest...
            fontSize="1em"
            disabled={loading}
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
      <Box h="2em">
        <Icon as={BarChartAlt2} mt="2" />
      </Box>
      {!editable ? (
        <Box>
          <SCBText>{recipeDifficulty || '-'}</SCBText>
        </Box>
      ) : (
        <Box>
          <FInput
            autoFocus
            fieldName={`difficulty`}
            rules={{ required: 'This is required' }}
            label={null}
            helper={null}
            defaultValue={recipeDifficulty}
            placeholder=""
            // rest...
            fontSize="1em"
            disabled={loading}
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
    </Stack>
  );
};
