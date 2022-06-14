import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Square,
  Text,
} from '@chakra-ui/react';
import { MinusSquare } from '@styled-icons/feather';
import { Grabber } from '@styled-icons/octicons';
import React from 'react';
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
        <Flex align="center" grow="1">
          {editable && (
            <IconButton
              aria-label="Change Order"
              fontSize="1.2rem"
              variant="ghost"
              color="purple.200"
              icon={<Icon as={Grabber} />}
            />
          )}
          <Flex minHeight="2.5rem" color="purple.800" grow="1">
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
        )}
      </Flex>
    </Flex>
  );
};
