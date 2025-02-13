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
  const today = new Date().toLocaleDateString('en-ZA').split('T')[0]

  if (!todos) {
    return []
  }

  return todos.filter(
    (todo) => new Date(todo.dueDate).toLocaleDateString('en-ZA').split('T')[0] === today
  )
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
    console.log('Adding todo:', todo)
    const savedTodo = await window.context.addTodo(todo)

    const prevTodos = await get(todosAtomAsync)

    set(todosAtom, [...prevTodos, savedTodo])
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
})
