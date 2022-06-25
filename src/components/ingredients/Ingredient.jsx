import {
  Box,
  Flex,
  Icon,
  IconButton,
  Square,
  Text,
  useColorMode,
  useColorModeValue,
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
    <Flex
      grow="1"
      //color="purple.900"
    >
      <Flex grow="1">
        <Flex align="start" grow="1">
          <Flex
            align="stretch"
            jusfity="center"
            //color="purple.800"
            grow="1"
          >
            {editable ? (
              <Flex grow="1">
                <FInput
                  fieldName={`desc.${fieldId}`}
                  rules={{ required: 'This is required' }}
                  label={null}
                  helper={null}
                  defaultValue={desc}
                  placeholder="Item name"
                  // rest...
                  bgColor={mode('pink.100', 'blackAlpha.300')}
                  minWidth={{ base: '40', md: '60' }}
                  height={10}
                  disabled={loading}
                  readOnly={dragOverlay}
                  //focusBorderColor="pink.400"
                />
              </Flex>
            ) : (
              <Flex
                borderRadius={'md'}
                grow="1"
                align="center"
                px={4}
                //bgColor="purple.400"
                height={10}
              >
                <Text>{desc}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        {editable && !dragOverlay && (
          <Flex height={10}>
            <Square>
              <IconButton
                isRound
                aria-label="Toggle Dark Mode"
                fontSize="1.2rem"
                variant="ghost"
                colorScheme="pink"
                //color="purple.200"
                icon={<Icon as={MinusSquare} />}
                onClick={handleDeleteIngredient}
              />
            </Square>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
