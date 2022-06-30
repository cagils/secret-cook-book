import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Square,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { MinusSquare } from '@styled-icons/feather';

import { FInput } from '../helpers/form/FInput';

export const Ingredient = ({
  loading,
  handleDeleteIngredient,
  editable = false,
  fieldId,
  desc,
  dragOverlay = false,
}) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <HStack
      // grow="1"
      //color="purple.900"
      // maxWidth="30em"
      // border="1px solid purple"
      width="full"
    >
      <Box width="full">
        <Box
          // border="1px solid cyan"
          //grow="1"
          // align="stretch"
          justify="center"
          // width="full"
          //color="purple.800"
        >
          {editable ? (
            <Box>
              <FInput
                fieldName={`desc.${fieldId}`}
                rules={{ required: 'This is required' }}
                label={null}
                helper={null}
                defaultValue={desc}
                placeholder="Item name"
                // rest...
                bgColor={mode('pink.100', 'blackAlpha.300')}
                //minWidth={{ base: '10em', md: '20em', lg: '60em' }}
                //maxWidth={{ base: 'initial', md: 'initial', lg: 'initial' }}
                //width="full"
                height={10}
                disabled={loading}
                readOnly={dragOverlay}
                //focusBorderColor="pink.400"
              />
            </Box>
          ) : (
            <Box
              borderRadius={'md'}
              //grow="1"
              align="center"
              px={4}
              //bgColor="purple.400"
              height={10}
            >
              <Text>{desc}</Text>
            </Box>
          )}
        </Box>
      </Box>
      {editable && !dragOverlay && (
        <Box height={10}>
          <Square>
            <IconButton
              isRound
              aria-label="Delete Ingredient"
              fontSize="1.2rem"
              variant="ghost"
              //color="purple.200"
              icon={<Icon as={MinusSquare} />}
              onClick={handleDeleteIngredient}
            />
          </Square>
        </Box>
      )}
    </HStack>
  );
};
