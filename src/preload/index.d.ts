import { AddTodo, GetTodos } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getTodos: GetTodos
      addTodo: AddTodo
    }
  }
}
