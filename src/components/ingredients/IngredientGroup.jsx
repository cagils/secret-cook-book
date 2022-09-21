import { Box, Icon, IconButton, Square, useColorMode } from '@chakra-ui/react';
import { PlusSquare } from '@styled-icons/feather';

import { ReorderableItem } from '@/components/helpers/reorderable/ReorderableItem';
import { ReorderableList } from '@/components/helpers/reorderable/ReorderableList';
import { GroupHeading } from '@/components/ingredients/GroupHeading';
import { Ingredient } from '@/components/ingredients/Ingredient';

export const IngredientGroup = ({
  loading,
  data,
  hasHeading = true,
  groupIdx,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewIngredient,
  handleReorder,
  instanceKey,
}) => {
  const { colorMode } = useColorMode();

  const mode = (lightValue, darkValue) => (colorMode == 'light' ? lightValue : darkValue);

  return (
    <Box alignItems="left">
      {hasHeading && (
        <Box my={4}>
          <GroupHeading
            groupName={data.groupName.trim()}
            editable={editable}
            groupId={groupIdx}
            loading={loading}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Box>
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
                editable={editable}
                desc={data.list[parseInt(id)]}
                fieldId={`${groupIdx}.${id}`}
              />
            </Box>
          )}
        >
          {data.list.map((ing, ingIdx) => (
            <ReorderableItem id={ingIdx.toString()} key={`key_${instanceKey}_${groupIdx}_${ingIdx}`}>
              <Ingredient
                loading={loading}
                editable={editable}
                fieldId={`${groupIdx}.${ingIdx}`}
                desc={ing}
                handleDeleteIngredient={() => handleDeleteIngredient(groupIdx, ingIdx)}
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
            handleDeleteIngredient={() => handleDeleteIngredient(groupIdx, ingIdx)}
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
