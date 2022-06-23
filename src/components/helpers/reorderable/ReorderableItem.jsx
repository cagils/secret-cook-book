import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grabber } from '@styled-icons/octicons';

export const ReorderableItem = ({ children, id, ...props }) => {
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
          aria-label="Grab Ingredient"
          fontSize="1.2rem"
          variant="ghost"
          colorScheme="pink"
          //color="purple.200"
          icon={<Icon as={Grabber} />}
          style={{ cursor: 'ns-resize' }}
        />
      </Flex>
      {children}
    </Flex>
  );
};
