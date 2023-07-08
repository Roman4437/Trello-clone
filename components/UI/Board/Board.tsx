'use client'

import { DragDropContext, Droppable } from "react-beautiful-dnd"

import BoardColumns from "./BoardColumns"
import useBoard from "@/hooks/useBoard"

export default function Board() {
  const { board, handleOnDragEnd } = useBoard()

  return (
    <div className="p-2 md:p-12">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column" >
          {p => <BoardColumns DroppableProvided={p} board={board} />}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
