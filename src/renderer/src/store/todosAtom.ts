import { atom } from 'jotai'
import { Todo } from '@shared/models'

const getTodos = async () => {
  const todos = await window.context.getTodos()
  return todos
}

export const todosAtom = atom<Todo[] | Promise<Todo[]>>(getTodos())

export const todayTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const today = new Date().toISOString().split('T')[0]

  return todos.filter((todo) => todo.dueDate.toISOString().split('T')[0] === today)
})

export const completedTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => todo.completed)
})
