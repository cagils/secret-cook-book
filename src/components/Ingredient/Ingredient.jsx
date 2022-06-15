import { Flex, Icon, IconButton, Square, Text } from '@chakra-ui/react';
import { MinusSquare } from '@styled-icons/feather';
import { Grabber } from '@styled-icons/octicons';

import { FInput } from '../Form/FInput';

export const Ingredient = ({
  handleDeleteIngredient,
  editable = false,
  fieldId,
  desc,
}) => {
  return (
    <Flex mb="4px" grow="1" color="purple.900">
      <Flex grow="1">
        <Flex align="start" grow="1">
          {editable && (
            <Flex height={10}>
              <IconButton
                aria-label="Change Order"
                fontSize="1.2rem"
                variant="ghost"
                color="purple.200"
                icon={<Icon as={Grabber} />}
              />
            </Flex>
          )}
          <Flex color="purple.800" grow="1">
            {editable ? (
              <FInput
                fieldName={`desc_${fieldId}`}
                rules={{ required: 'This is required' }}
                label={null}
                helper={null}
                defaultValue={desc}
                placeholder="Item name"
                // rest...
                bg="purple.300"
                minWidth={{ base: '100px', md: '300px' }}
              />
            ) : (
              <Flex
                borderRadius={'md'}
                grow="1"
                alignSelf="stretch"
                align="center"
                px={4}
                bg="purple.400"
              >
                <Text>{desc}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        {editable && (
          <Flex height={10}>
            <Square>
              <IconButton
                isRound
                aria-label="Toggle Dark Mode"
                fontSize="1.2rem"
                variant="ghost"
                color="purple.200"
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
