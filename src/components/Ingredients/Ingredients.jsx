import {
  Box,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Square,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { forwardRef, useEffect, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { Ingredient } from '../Ingredient/Ingredient';
import {
  FilePlus,
  FileMinus,
  PlusSquare,
  MinusSquare,
} from '@styled-icons/feather';

export const Ingredients = ({ ingredients, editable }) => {
  return (
    <Box bg="blackAlpha.300" borderRadius={4} my={4} p={4}>
      <Heading pb="2" borderBottomWidth={1} size="md">
        Ingredients
      </Heading>
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            {ingredients.map((group) => {
              return (
                <Box key={group.groupName} align="left" mt="20px">
                  {group.groupName !== 'default' && (
                    <Box>
                      <Stack direction="row" align="center">
                        <Heading pb="2" size="md">
                          {group.groupName}
                        </Heading>
                        <IconButton
                          isRound
                          aria-label="Toggle Dark Mode"
                          fontSize="1.2rem"
                          variant="ghost"
                          color="purple.200"
                          icon={<Icon as={FileMinus} />}
                        />
                      </Stack>
                    </Box>
                  )}
                  {group.list.map((ing, i) => (
                    <Ingredient
                      key={i}
                      editable={editable}
                      fieldId={i}
                      desc={ing}
                    />
                  ))}
                  <Square>
                    <IconButton
                      isRound
                      aria-label="Toggle Dark Mode"
                      fontSize="1.2rem"
                      variant="ghost"
                      color="purple.200"
                      icon={<Icon as={PlusSquare} />}
                    />
                  </Square>
                </Box>
              );
            })}
          </Box>
          <Flex>
            <IconButton
              isRound
              aria-label="Toggle Dark Mode"
              fontSize="1.2rem"
              variant="ghost"
              color="purple.200"
              icon={<Icon as={FilePlus} />}
            />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};
