import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Icon,
  IconButton,
  Square,
  Stack,
} from '@chakra-ui/react';
import { FileMinus, PlusSquare } from '@styled-icons/feather';
import { FInput } from '../Form/FInput';

import { Ingredient } from '../Ingredient/Ingredient';

import { Grabber } from '@styled-icons/octicons';
import { useEffect, useRef, useState } from 'react';

import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { randomKey } from '../../lib/tools';

function ReorderableItem({ children, id, ...props }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Flex
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...props}
    >
      <Flex height={10} {...attributes} {...listeners}>
        <IconButton
          isRound
          aria-label="Toggle Dark Mode"
          fontSize="1.2rem"
          variant="ghost"
          color="purple.200"
          icon={<Icon as={Grabber} />}
          style={{ cursor: 'ns-resize' }}
        />
      </Flex>
      {children}
    </Flex>
  );
}

const ReorderableList = ({
  children,
  reorderHandler,
  id,
  items: defaultItems,
  ...props
}) => {
  const [items, setItems] = useState(defaultItems);

  useEffect(() => setItems(defaultItems), [defaultItems]);

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      const newItems = arrayMove(items, activeIndex, overIndex);
      setItems(newItems);
      reorderHandler(newItems);
    }
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      <SortableContext id={id} items={items}>
        <div {...props}>{children}</div>
      </SortableContext>
    </DndContext>
  );
};

function IngredientGroup({
  data,
  groupIdx,
  editable,
  handleDeleteGroup,
  handleDeleteIngredient,
  handleNewIngredient,
  handleReorder,
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

      <ReorderableList
        items={data.list.map((v, i) => ({ id: i.toString(), value: v }))}
        reorderHandler={(items) => handleReorder(groupIdx, items)}
      >
        {data.list.map((ing, ingIdx) => (
          <ReorderableItem
            id={ingIdx.toString()}
            key={`key_${groupIdx}_${ingIdx}_${randomKey()}`}
          >
            <Ingredient
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
