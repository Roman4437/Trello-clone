import { useBoardStore } from "@/store/BoardStore"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { DraggableLocation, DropResult } from "react-beautiful-dnd"

export default function useBoard() {
  const [board, getBoard, setBoardState, updateBoard] = useBoardStore(s => [s.board, s.getBoard, s.setBoardState, s.updateBoard])
  const { data } = useSession()

  useEffect(() => {
    getBoard(data?.user?.email!)
  }, [])

  function handleOnDragEnd(result: DropResult) {
    const { source, type, destination } = result

    if (!destination) return

    if (type === "column") {
      return switchColumns(destination, source)
    }

    const columns = Array.from(board.columns)
    const startIndex = columns[Number(source.droppableId)]
    const endIndex = columns[Number(destination.droppableId)]

    const startColumn = {
      id: startIndex[0],
      todos: startIndex[1].todos
    }

    const endColum = {
      id: endIndex[0],
      todos: endIndex[1].todos
    }

    const noColumns = !startColumn || !endColum
    const draggedToSameDestination = source.index === destination.index && startColumn === endColum

    if (noColumns || draggedToSameDestination) return

    const newTodos = startColumn.todos
    const [movedTodo] = newTodos.splice(source.index, 1)

    const isSameColumn = startColumn.id === endColum.id

    if (isSameColumn)
      switchInSameColumn(newTodos, destination, movedTodo, startColumn)
    else
      switchBetweenDifferentColumns(newTodos, destination, movedTodo, startColumn, endColum)
  }

  function switchColumns(destination: DraggableLocation, source: DraggableLocation) {
    const entries = Array.from(board.columns.entries())
    const [removed] = entries.splice(source.index, 1)
    entries.splice(destination.index, 0, removed)
    const rearangedColumns = new Map(entries)
    setBoardState({ ...board, columns: rearangedColumns })
  }

  function switchInSameColumn(newTodos: Todo[], destination: DraggableLocation, movedTodo: Todo, startColumn: Column) {
    newTodos.splice(destination.index, 0, movedTodo)

    const newColumn = {
      id: startColumn.id,
      todos: newTodos
    }

    const newColumns = new Map(board.columns)
    newColumns.set(startColumn.id, newColumn)

    setBoardState({ ...board, columns: newColumns })
  }

  function switchBetweenDifferentColumns(newTodos: Todo[], destination: DraggableLocation, movedTodo: Todo, startColumn: Column, endColum: Column) {
    const endTodos = Array.from(endColum.todos)
    endTodos.splice(destination.index, 0, movedTodo)

    const newStartColumn = {
      id: startColumn.id,
      todos: newTodos
    }

    const newEndColum = {
      id: endColum.id,
      todos: endTodos
    }

    const newColumns = new Map(board.columns)
    newColumns.set(startColumn.id, newStartColumn)
    newColumns.set(endColum.id, newEndColum)

    updateBoard(movedTodo, endColum.id)
    setBoardState({ ...board, columns: newColumns })
  }

  return { board, handleOnDragEnd }
}