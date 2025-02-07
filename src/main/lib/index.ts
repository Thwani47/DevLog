import { homedir } from 'os'
import { APP_DIRECTORY_NAME } from '@shared/constants'
import PouchDB from 'pouchdb'
import { GetTodos } from '@shared/types'

const todosDb = new PouchDB('todos')

export const getRootDir = () => {
  return `${homedir()}/${APP_DIRECTORY_NAME}`
}

export const getTodos: GetTodos = async () => {
  const todos = await todosDb.allDocs({ include_docs: true })
  return todos
}
