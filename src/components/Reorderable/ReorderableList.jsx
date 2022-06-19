import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

export const ReorderableList = ({
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
