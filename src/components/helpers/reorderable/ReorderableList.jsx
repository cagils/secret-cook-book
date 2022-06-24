import { Box } from '@chakra-ui/react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragOVerlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

export const ReorderableList = ({
  children,
  reorderHandler,
  id,
  items: defaultItems,
  renderDragOverlay,
  ...props
}) => {
  const [items, setItems] = useState(defaultItems);
  //const [activeId, setActiveId] = useState(null);

  useEffect(() => setItems(defaultItems), [defaultItems]);

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });
  const pointerSensor = useSensor(PointerSensor);

  /* const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    }, 
  }); */

  const sensors = useSensors(pointerSensor, keyboardSensor);

  function handleDragStart(event) {
    //setActiveId(event.active.id);
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      return;
    }

    //setActiveId(null);
    if (active.id !== over.id) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index || 0;

      const newItems = arrayMove(items, activeIndex, overIndex);
      setItems(newItems);
      reorderHandler(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      collisionDetection={closestCenter}
      //onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={{
        threshold: {
          x: 0,
          y: 0.02,
        },
      }}
    >
      <SortableContext
        //id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
      {/*       <DragOverlay
        adjustScale={true}
        //className?: string;
        //dropAnimation?: DropAnimation | null;
        //transition?: string | TransitionGetter;
        //modifiers?: Modifiers;
        //wrapperElement?: keyof JSX.IntrinsicElements;
        //zIndex?: number;
      >
        {activeId ? renderDragOverlay(activeId) : null}
      </DragOverlay> */}
    </DndContext>
  );
};
