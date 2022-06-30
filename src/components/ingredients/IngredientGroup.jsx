import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Square,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { FileMinus, PlusSquare } from '@styled-icons/feather';
import { FInput } from '../helpers/form/FInput';

import { Ingredient } from './Ingredient';

import { Grabber } from '@styled-icons/octicons';
import { ReorderableItem } from '../helpers/reorderable/ReorderableItem';
import { ReorderableList } from '../helpers/reorderable/ReorderableList';
import { GroupHeading } from './GroupHeading';

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
  const { colorMode } = useColorMode();

  const mode = (lightValue, darkValue) =>
    colorMode == 'light' ? lightValue : darkValue;

  return (
    <Box align="left" mt="20px">
      {data.groupName !== 'default' && (
        <GroupHeading
          groupName={data.groupName}
          editable={editable}
          groupId={groupIdx}
          loading={loading}
          handleDeleteGroup={handleDeleteGroup}
        />
      )}
      <Divider mb={4} />

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
                editable={editable}
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
            icon={<Icon as={PlusSquare} />}
            onClick={() => handleNewIngredient(groupIdx)}
          />
        </Square>
      )}
    </Box>
  );
};
