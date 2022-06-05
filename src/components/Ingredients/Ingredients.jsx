import { Box, Heading } from '@chakra-ui/react';
import React, { forwardRef, useEffect, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { Ingredient } from '../Ingredient/Ingredient';

export const Ingredients = ({ ingredients }) => {
  return (
    <Box>
      <Box>Ingredients</Box>
      <Box m="8px" justify="center" align="center" grow="1">
        <Box maxWidth="1200px" justify="center" align="center">
          <Box>
            {ingredients.map((group) => {
              return (
                <Box key={group.groupName} align="left" mt="20px">
                  {group.groupName !== 'default' && (
                    <Heading size="md">{group.groupName}</Heading>
                  )}
                  {group.list.map((ing, i) => (
                    <Ingredient key={i} fieldId={i} desc={ing} />
                  ))}
                </Box>
              );
            })}
            <Ingredient fieldId={4} plus />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
