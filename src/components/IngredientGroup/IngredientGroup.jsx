import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Icon,
  IconButton,
  Square,
  Stack,
} from '@chakra-ui/react';
import { FileMinus, PlusSquare } from '@styled-icons/feather';
import { FInput } from '../Form/FInput';

import { Ingredient } from '../Ingredient/Ingredient';

function IngredientGroup({
  data,
  groupIdx,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewIngredient,
}) {
  return (
    <Box align="left" mt="20px">
      {data.groupName !== 'default' && (
        <Box>
          <Stack direction="row" align="center">
            <Heading pb="2" size="md">
              {!editable ? (
                data.groupName
              ) : (
                <FInput
                  type="editable"
                  startWithEditView={data.groupName === ''}
                  fieldName={`group.${groupIdx}`}
                  rules={{ required: 'This is required' }}
                  label={null}
                  helper={null}
                  defaultValue={data.groupName}
                  placeholder="Group name"
                  // rest...
                  // bg="purple.300"
                  // minWidth={{ base: '100px', md: '300px' }}
                />
              )}
            </Heading>
            {editable && (
              <IconButton
                isRound
                aria-label="Toggle Dark Mode"
                fontSize="1.2rem"
                variant="ghost"
                color="purple.200"
                icon={<Icon as={FileMinus} />}
                onClick={() => handleDeleteGroup(groupIdx)}
              />
            )}
          </Stack>
        </Box>
      )}
      {data.list.map((ing, ingIdx) => (
        <Ingredient
          key={`key_${groupIdx}_${ingIdx}`}
          editable={editable}
          fieldId={`${groupIdx}.${ingIdx}`}
          desc={ing}
          handleDeleteIngredient={() =>
            handleDeleteIngredient(groupIdx, ingIdx)
          }
        />
      ))}
      {editable && (
        <Square>
          <IconButton
            isRound
            aria-label="Toggle Dark Mode"
            fontSize="1.2rem"
            variant="ghost"
            color="purple.200"
            icon={<Icon as={PlusSquare} />}
            onClick={() => handleNewIngredient(groupIdx)}
          />
        </Square>
      )}
    </Box>
  );
}

export default IngredientGroup;
