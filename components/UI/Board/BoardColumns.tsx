import { DroppableProvided } from "react-beautiful-dnd"

import Column from "./Column"

interface BoardColumnsProps {
  DroppableProvided: DroppableProvided,
  board: Board
}

export default function BoardColumns({ DroppableProvided, board }: BoardColumnsProps) {
  const columns = Array.from(board.columns.entries())

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-5"
      {...DroppableProvided.droppableProps}
      ref={DroppableProvided.innerRef}>
      {columns.map(([id, column], index) =>
        <Column key={id} id={id} todos={column.todos} index={index} />)}
    </div>
  )
}
