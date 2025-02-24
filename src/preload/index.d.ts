import {
  AddTodo,
  DeleteTodo,
  EditTodo,
  GetJournalEntries,
  GetTodos,
  SaveJournalEntry
} from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getTodos: GetTodos
      addTodo: AddTodo
      editTodo: EditTodo
      deleteTodo: DeleteTodo
      saveJournalEntry: SaveJournalEntry
      getJournalEntries: GetJournalEntries
    }
  }
}
