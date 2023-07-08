import { DraggableProvided, Droppable } from "react-beautiful-dnd"

import { ColumnProps } from "./Column"
import ColumnDrop from "./ColumnDrop"

interface ColumnDraggProps extends ColumnProps {
  DraggableProvided: DraggableProvided,
}

export default function ColumnDragg({ DraggableProvided, id, todos, index }: ColumnDraggProps) {
  return (
    <div
      {...DraggableProvided.draggableProps}
      {...DraggableProvided.dragHandleProps}
      ref={DraggableProvided.innerRef}>
      <Droppable droppableId={index.toString()} type="card">
        {(p, s) => <ColumnDrop DroppableProvided={p} DroppableStateSnapshot={s} id={id} todos={todos} index={index} />}
      </Droppable>
    </div>
  )
}
