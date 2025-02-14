import { Todo } from './models'

// Todos
export type GetTodos = () => Promise<Todo[]>
export type AddTodo = (todo: Todo) => Promise<Todo>
export type EditTodo = (todo: Todo) => Promise<boolean>
export type DeleteTodo = (todo: Todo) => Promise<boolean>
