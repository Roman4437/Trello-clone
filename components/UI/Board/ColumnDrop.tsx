import { DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd"
import { useBoardStore } from "@/store/BoardStore"
import { ColumnProps } from "./Column"

import ColumnRows from "./ColumnRows"

interface ColumnDropProps extends ColumnProps {
  DroppableProvided: DroppableProvided,
  DroppableStateSnapshot: DroppableStateSnapshot
}

const idToColumnText: { [key in ColumnType]: string } = {
  "todo": "To Do",
  "inprogress": "In Progress",
  "done": "Done"
}

export default function ColumnDrop({ DroppableProvided, DroppableStateSnapshot, id, todos }: ColumnDropProps) {
  const [searchString] = useBoardStore(s => [s.searchString])

  const filteredTodos = todos.filter(t => t.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))

  return (
    <div
      className={`p-2 rounded-2xl shadow-sm ${DroppableStateSnapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`}
      {...DroppableProvided.droppableProps}
      ref={DroppableProvided.innerRef}>
      <h2 className="flex justify-between font-bold text-xl p-2">
        <span className="text-black">{idToColumnText[id]}</span>
        <span className="flex justify-center items-center text-neutral-400 bg-neutral-200 rounded-full w-6 h-6 text-xs font-normal">
          {filteredTodos.length}
        </span>
      </h2>
      <ColumnRows DroppableProvided={DroppableProvided} id={id} todos={filteredTodos} />
    </div>
  )
}
