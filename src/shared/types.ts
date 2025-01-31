export interface Todo {
  id: string
  title: string
  completed: boolean
  date: string
}

export interface TIL {
  id: number
  title: string
  date: string
  tags?: string[]
}
