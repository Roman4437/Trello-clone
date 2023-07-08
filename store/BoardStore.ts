import { ID, database, storage } from "@/appwrite"
import { getTodos } from "@/lib/getTodos"
import { uploadImage } from "@/lib/uploadImage"
import { create } from "zustand"

interface BoardState {
  board: Board,
  getBoard: (e: string) => void,
  searchString: string,
  setSearchString: (s: string) => void,
  setBoardState: (b: Board) => void,
  addTask: (t: string, cId: ColumnType, e: string, i?: File | undefined) => Promise<void>,
  deleteTask: (i: number, tId: Todo, id: ColumnType) => void
  updateBoard: (t: Todo, cId: ColumnType) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<ColumnType, Column>()
  },

  searchString: "",

  setSearchString: searchString => set({ searchString }),

  getBoard: async (email: string) => {
    const board = await getTodos(email)
    set({ board })
  },

  setBoardState: board => set({ board }),

  addTask: async (todo: string, columnId: ColumnType, email: string, image?: File | undefined) => {
    let file: Image | undefined

    if (image) {
      const uploadedImage = await uploadImage(image)
      if (uploadedImage) {
        file = {
          bucketId: uploadedImage.bucketId,
          fileId: uploadedImage.$id
        }
      }
    }

    const { $id } = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        email: email,
        ...(file && { image: JSON.stringify(file) })
      }
    )

    set(state => {
      const newColumns = new Map(state.board.columns)

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file })
      }

      const column = newColumns.get(columnId)

      const body = {
        id: columnId,
        todos: [newTodo]
      }

      if (!column) {
        newColumns.set(columnId, body)
      } else {
        newColumns.get(columnId)?.todos.push(newTodo)
      }

      return {
        board: {
          columns: newColumns
        }
      }
    })
  },

  deleteTask: async (taskIndex: number, todo: Todo, id: ColumnType) => {
    const newColumns = new Map(get().board.columns)

    newColumns.get(id)?.todos.splice(taskIndex, 1)

    set({ board: { columns: newColumns } })

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId)
    }

    await database.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id)
  },

  updateBoard: async (todo, columnId) => {
    const document = {
      title: todo.title,
      status: columnId
    }

    await database.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id, document)
  }
}))