import { Todo } from './models'

// Todos
export type GetTodos = () => Promise<Todo[]>
export type AddTodo = (todo: Todo) => Promise<Todo>
