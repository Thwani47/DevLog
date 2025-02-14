import { AddTodo, DeleteTodo, EditTodo, GetTodos } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getTodos: (...args: Parameters<GetTodos>) => ipcRenderer.invoke('getTodos', ...args),
    addTodo: (...args: Parameters<AddTodo>) => ipcRenderer.invoke('addTodo', ...args),
    editTodo: (...args: Parameters<EditTodo>) => ipcRenderer.invoke('editTodo', ...args),
    deleteTodo: (...args: Parameters<DeleteTodo>) => ipcRenderer.invoke('deleteTodo', ...args)
  })
} catch (error) {
  console.error(error)
}
