import { database } from "@/appwrite"
import { Models, Query } from "appwrite"

export async function getTodos(email: string) {
  const data = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
    [Query.equal("email", [email])]
  )

  const todos = data.documents
  const columns = getColumnsMap(todos)
  const sortedColumns = getSortedColumns(columns)

  return sortedColumns
}

function getColumnsMap(todos: Models.Document[]) {
  const sorted = todos.reduce((map, todo) => {
    if (!map.get(todo.status)) {
      const key = {
        id: todo.status,
        todos: []
      }
      map.set(todo.status, key)
    }

    const document = {
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) })
    }
    map.get(todo.status)!.todos.push(document)

    return map
  }, new Map<ColumnType, Column>())

  return sorted
}

function getSortedColumns(columns: Map<ColumnType, Column>) {
  const columnTypes: ColumnType[] = ["todo", "inprogress", "done"]

  for (const type of columnTypes) {
    if (!columns.get(type)) {
      const key = {
        id: type,
        todos: []
      }
      columns.set(type, key)
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
  )

  const board: Board = {
    columns: sortedColumns
  }

  return board
}