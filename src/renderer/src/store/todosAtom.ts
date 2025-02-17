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

  if (!todos) {
    return []
  }

  const today = new Date().toLocaleDateString('en-ZA').split('T')[0]

  const todaysTodos = todos.filter(
    (todo) => new Date(todo.dueDate).toLocaleDateString('en-ZA').split('T')[0] === today
  )

  // sort the todos by date created in descending order
  const sortedTodos = todaysTodos.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())

  return sortedTodos.slice(0, 3) // take the first 3 todos
})

export const allTodosAtom = atom((get) => {
  const todos = get(todosAtom)

  if (!todos) {
    return []
  }

  return todos.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
})

export const overdueTodosAtom = atom((get) => {
  const todos = get(todosAtom)

  if (!todos) {
    return []
  }

  const today = new Date().toLocaleDateString('en-ZA').split('T')[0]

  const overdueTodos = todos.filter(
    (todo) =>
      new Date(todo.dueDate).toLocaleDateString('en-ZA').split('T')[0] < today && !todo.completed
  )

  // sort the todos by date created in descending order
  const sortedTodos = overdueTodos.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())

  return sortedTodos
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

    const prevTodos = await get(todosAtomAsync)

    set(todosAtom, [...prevTodos, savedTodo])
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
})

export const editTodoAtom = atom(null, async (get, set, todo: Todo) => {
  try {
    const isEdited = await window.context.editTodo(todo)

    if (isEdited) {
      const prevTodos = await get(todosAtomAsync)

      set(
        todosAtom,
        prevTodos.map((prevTodo) => (prevTodo._id === todo._id ? todo : prevTodo))
      )
    }
  } catch (error) {
    console.error('Failed to edit todo:', error)
  }
})

export const deleteTodoAtom = atom(null, async (get, set, todo: Todo) => {
  try {
    const isDeleted = await window.context.deleteTodo(todo)

    if (isDeleted) {
      const prevTodos = await get(todosAtomAsync)

      set(
        todosAtom,
        prevTodos.filter((prevTodo) => prevTodo._id !== todo._id)
      )
    }
  } catch (error) {
    console.error('Failed to delete todo:', error)
  }
})
