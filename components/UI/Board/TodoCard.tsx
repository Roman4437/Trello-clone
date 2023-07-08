import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd"
import { useBoardStore } from "@/store/BoardStore"
import useImage from "@/hooks/useImage"


import { XCircleIcon } from "@heroicons/react/24/solid"
import Image from "next/image"

interface TodoCardProps {
  draggableProps: DraggableProvidedDraggableProps,
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
  todo: Todo,
  index: number,
  id: ColumnType
  innerRef: (e: HTMLElement | null) => void
}

export default function TodoCard({ id, todo, index, innerRef, dragHandleProps, draggableProps }: TodoCardProps) {
  const deleteTask = useBoardStore(s => s.deleteTask)
  const { imageUrl } = useImage(todo)

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}>
      <div className="flex justify-between items-center p-5">
        <span className="truncate">{todo.title}</span>
        <button
          className="text-red-400 hover:text-red-500"
          onClick={() => deleteTask(index, todo, id)}
        >
          <XCircleIcon className="ml-5 w-6" />
        </button>
      </div>
      {imageUrl &&
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
            alt="img"
          />
        </div>}
    </div>
  )
}
