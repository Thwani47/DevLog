export interface Todo {
  _id: string
  title: string
  completed: boolean
  dueDate: Date
  dateCreated: Date
  tags?: string[]
  description?: string
}

export interface TIL {
  _id: string
  title: string
  date: string
  tags?: string[]
}

export interface JournalEntry {
  _id: string
  title: string
  date: string
  content: string
}
