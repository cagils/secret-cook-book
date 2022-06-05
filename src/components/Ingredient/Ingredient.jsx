import { Box, Flex, Icon, IconButton, Square } from '@chakra-ui/react';
import { MinusSquare, PlusSquare } from '@styled-icons/feather';
import React from 'react';
import { FInput } from '../Form/FInput';

export const Ingredient = ({ fieldId, plus = false, desc }) => {
  return (
    <Box>
      <Flex grow="1" my={{ base: '4px', md: '6px' }}>
        <Flex grow="1" gap={{ base: '4px', md: '6px' }} wrap="wrap">
          <Box flexGrow="1">
            <FInput
              fieldName={`desc_${fieldId}`}
              minWidth={{ base: '100px', md: '300px' }}
              // isRequired
              variant="filled"
              placeholder="Item name"
              defaultValue={desc}
              rules={{ required: 'This is required' }}
            />
          </Box>
        </Flex>
        <Square>
          <IconButton
            flexBasis="1"
            isRound
            aria-label="Toggle Dark Mode"
            fontSize="1.2rem"
            variant="ghost"
            icon={<Icon as={plus ? PlusSquare : MinusSquare} />}
          />
        </Square>
      </Flex>
    </Box>
  );
};
