import { Draggable, DroppableProvided } from "react-beautiful-dnd"

import TodoCard from "./TodoCard"
import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { useModalStore } from "@/store/ModalStore"

interface ColumnRowsProps {
  DroppableProvided: DroppableProvided,
  id: ColumnType,
  todos: Todo[]
}

export default function ColumnRows({ id, todos, DroppableProvided }: ColumnRowsProps) {
  const openModal = useModalStore(s => s.openModal)

  return (
    <div className="space-y-2">
      {todos.map((todo, index) => <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
        {p => <TodoCard
          todo={todo}
          index={index}
          id={id}
          draggableProps={p.draggableProps}
          dragHandleProps={p.dragHandleProps}
          innerRef={p.innerRef} />}
      </Draggable>)}
      {DroppableProvided.placeholder}
      <div className="flex items-end p-2">
        <button
          onClick={() => openModal(id)}
          className="text-green-400 hover:text-green-500">
          <PlusCircleIcon className="w-10" />
        </button>
      </div>
    </div>
  )
}
