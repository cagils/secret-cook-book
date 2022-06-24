import { Box, Flex, Icon, IconButton } from '@chakra-ui/react';
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grabber } from '@styled-icons/octicons';

export const ReorderableItem = ({ children, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
    isOver,
  } = useSortable({ id });

  return (
    <Flex
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 1 : 1,
      }}
      id={id}
      my={2}
      p={0}
    >
      <Box height={10} {...attributes} {...listeners} css="touch-action: none">
        <IconButton
          isRound
          aria-label="Grab Ingredient"
          fontSize="1.2rem"
          variant="ghost"
          colorScheme="pink"
          //color="purple.200"
          icon={<Icon as={Grabber} />}
          style={{ cursor: 'ns-resize' }}
        />
      </Box>
      {children}
    </Flex>
  );
};
