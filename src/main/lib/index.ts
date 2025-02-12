import { homedir } from 'os'
import { APP_DIRECTORY_NAME } from '@shared/constants'
import PouchDB from 'pouchdb'
import { ensureDir } from 'fs-extra'
import { AddTodo, GetTodos } from '@shared/types'
import { Todo } from '@shared/models'

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
    .map((row) => {
      if (!row.doc) {
        return null
      }

      const doc = row.doc as unknown as Todo

      return {
        _id: doc._id,
        title: doc.title ?? '',
        completed: doc.completed ?? false,
        dueDate: doc.dueDate ? new Date(doc.dueDate) : null,
        dateCreated: doc.dateCreated ? new Date(doc.dateCreated) : null,
        tags: doc.tags ?? [],
        description: doc.description ?? ''
      } as Todo
    })
    .filter((todo): todo is Todo => todo !== null)
}

export const addTodo: AddTodo = async (todo) => {
  const result = await todosDb.put(todo)
  return { ...todo, _id: result.id, _rev: result.rev }
}
