import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'
import { Todo } from '@shared/models'

const getTodos = async () => {
  const todos = await window.context.getTodos()
  return todos
}

export const todosAtomAsync = atom<Todo[] | Promise<Todo[]>>(getTodos())

export const todosAtom = unwrap(todosAtomAsync, (prev) => prev)

export const todayTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const today = new Date().toISOString().split('T')[0]

  if (!todos) {
    return []
  }

  return todos.filter((todo) => todo.dueDate.toISOString().split('T')[0] === today)
})

export const completedTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  if (!todos) {
    return []
  }
  return todos.filter((todo) => todo.completed)
})

export const addTodoAtom = atom(null, async (get, set, todo: Todo) => {
  try {
    const savedTodo = await window.context.addTodo(todo)

    set(todosAtom, (prevTodos) => [...prevTodos, savedTodo])
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
})
