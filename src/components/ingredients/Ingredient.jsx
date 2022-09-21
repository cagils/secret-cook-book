<<<<<<< HEAD
import { Box, Flex, HStack, Icon, IconButton, Square, Text, useColorMode } from '@chakra-ui/react';
=======
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Square,
  Text,
  useColorMode
} from '@chakra-ui/react';
>>>>>>> test commit empty
import { Feather } from '@styled-icons/entypo';
import { MinusSquare } from '@styled-icons/feather';

import { FInput } from '@/components/helpers/form/FInput';

export const Ingredient = ({
  loading,
  handleDeleteIngredient,
  editable = false,
  fieldId,
  desc,
  dragOverlay = false,
}) => {
  const { colorMode } = useColorMode();
  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);

  return (
    <HStack
      // grow="1"
      //color="purple.900"
      // maxWidth="30em"
      // border="1px solid purple"
      // test
      width="full"
    >
      <Box width="full">
        <Box
          // border="1px solid cyan"
          //grow="1"
          // alignItems="stretch"
          justifyContent="center"
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
                height={10}
                disabled={loading}
                readOnly={dragOverlay}
                fontSize="1.1em"
                fontFamily="ingredients"
                // fontStyle="italic"
                color={mode('gray.700', 'gray.300')}
              />
            </Box>
          ) : (
            <HStack>
              <Square>
                <Icon fontSize="1.3em" color={mode('pink.300', 'pink.500')} as={Feather} />
              </Square>
              <Flex
                minHeight={10}
                width="full"
                borderRadius={'md'}
                my={1}
                px={4}
                //grow="1"
                alignItems="center"
                justifyContent="start"
                //px={4}
                // pos="relative"
                color={mode('gray.700', 'gray.300')}
              >
                <Text fontFamily="ingredients" fontStyle="italic" fontSize="1.2em">
                  {desc}
                </Text>
              </Flex>
            </HStack>
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
