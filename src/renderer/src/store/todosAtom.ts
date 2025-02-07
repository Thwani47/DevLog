import { atom } from 'jotai'
import { Todo } from '@shared/types'

export const todosAtom = atom<Todo[]>([])

export const todayTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const today = new Date().toISOString().split('T')[0]
  console.log(today)

  return todos.filter((todo) => todo.dueDate.toISOString().split('T')[0] === today)
})

export const completedTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => todo.completed)
})
