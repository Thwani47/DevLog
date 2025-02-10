import { homedir } from 'os'
import { APP_DIRECTORY_NAME } from '@shared/constants'
import PouchDB from 'pouchdb'
import { ensureDir } from 'fs-extra'
import { AddTodo, GetTodos } from '@shared/types'

const todosDb = new PouchDB('todos', {
  prefix: `${homedir()}/${APP_DIRECTORY_NAME}/`
})

export const getRootDir = () => {
  return `${homedir()}/${APP_DIRECTORY_NAME}`
}

export const getTodos: GetTodos = async () => {
  ensureDir(getRootDir())
  const todos = await todosDb.allDocs({ include_docs: true })
  return todos.rows
}

export const addTodo: AddTodo = async (todo) => {
  const result = await todosDb.put(todo)
  return { ...todo, _id: result.id, _rev: result.rev }
}
