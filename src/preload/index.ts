import { AddTodo, GetTodos } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    locale: navigator.language,
    getTodos: (...args: Parameters<GetTodos>) => ipcRenderer.invoke('getTodos', ...args),
    addTodo: (...args: Parameters<AddTodo>) => ipcRenderer.invoke('addTodo', ...args)
  })
} catch (error) {
  console.error(error)
}
