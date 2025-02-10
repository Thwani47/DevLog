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
  id: number
  title: string
  date: string
  tags?: string[]
}
