import { Todo, JournalEntry } from './models'

// Todos
export type GetTodos = () => Promise<Todo[]>
export type AddTodo = (todo: Todo) => Promise<Todo>
export type EditTodo = (todo: Todo) => Promise<boolean>
export type DeleteTodo = (todo: Todo) => Promise<boolean>

// journal
export type SaveJournalEntry = (entry: JournalEntry) => Promise<JournalEntry>
export type GetJournalEntries = () => Promise<JournalEntry[]>
