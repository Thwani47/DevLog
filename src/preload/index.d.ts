import { AddTodo, DeleteTodo, EditTodo, GetTodos } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getTodos: GetTodos
      addTodo: AddTodo
      editTodo: EditTodo
      deleteTodo: DeleteTodo
    }
  }
}
