import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Square,
  Stack,
} from '@chakra-ui/react';
import { FileMinus, PlusSquare } from '@styled-icons/feather';
import { FInput } from '../helpers/form/FInput';

import { Ingredient } from './Ingredient';

import { Grabber } from '@styled-icons/octicons';
import { ReorderableItem } from '../helpers/reorderable/ReorderableItem';
import { ReorderableList } from '../helpers/reorderable/ReorderableList';

export const IngredientGroup = ({
  loading,
  data,
  groupIdx,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewIngredient,
  handleReorder,
  instanceKey,
}) => {
  return (
    <Box align="left" mt="20px">
      {data.groupName !== 'default' && (
        <HStack>
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
                disabled={loading}
                // rest...
                // bg="purple.300"
                // minWidth={{ base: '100px', md: '300px' }}
              />
            )}
          </Heading>
          {editable && (
            <IconButton
              isRound
              aria-label="Delete Group"
              fontSize="1.2rem"
              variant="ghost"
              //color="purple.200"
              icon={<Icon as={FileMinus} />}
              onClick={() => handleDeleteGroup(groupIdx)}
            />
          )}
        </HStack>
      )}

      {editable ? (
        <ReorderableList
          items={data.list.map((ing, ingIdx) => ({
            id: ingIdx.toString(),
            value: ing,
          }))}
          reorderHandler={(items) => handleReorder(groupIdx, items)}
          renderDragOverlay={(id) => (
            <Box id={id}>
              <Ingredient
                dragOverlay={true}
                loading={loading}
                editable={true}
                desc={data.list[parseInt(id)]}
                fieldId={`${groupIdx}.${id}`}
              />
            </Box>
          )}
        >
          {data.list.map((ing, ingIdx) => (
            <ReorderableItem
              id={ingIdx.toString()}
              key={`key_${instanceKey}_${groupIdx}_${ingIdx}`}
            >
              <Ingredient
                loading={loading}
                editable={editable}
                fieldId={`${groupIdx}.${ingIdx}`}
                desc={ing}
                handleDeleteIngredient={() =>
                  handleDeleteIngredient(groupIdx, ingIdx)
                }
              />
            </ReorderableItem>
          ))}
        </ReorderableList>
      ) : (
        data.list.map((ing, ingIdx) => (
          <Ingredient
            loading={loading}
            key={`key_${instanceKey}_${groupIdx}_${ingIdx}`}
            editable={editable}
            fieldId={`${groupIdx}.${ingIdx}`}
            desc={ing}
            handleDeleteIngredient={() =>
              handleDeleteIngredient(groupIdx, ingIdx)
            }
          />
        ))
      )}
      {editable && (
        <Square>
          <IconButton
            isRound
            aria-label="Add New Ingredient"
            fontSize="1.2rem"
            variant="ghost"
            //color="purple.200"
            icon={<Icon as={PlusSquare} />}
            onClick={() => handleNewIngredient(groupIdx)}
          />
        </Square>
      )}
    </Box>
  );
};
