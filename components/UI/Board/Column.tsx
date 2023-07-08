import { Draggable } from "react-beautiful-dnd"

import ColumnDragg from "./ColumnDragg"

export interface ColumnProps {
  id: ColumnType,
  todos: Todo[],
  index: number
}

export default function Column({ id, todos, index }: ColumnProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {p => <ColumnDragg DraggableProvided={p} id={id} index={index} todos={todos} />}
    </Draggable>
  )
}
