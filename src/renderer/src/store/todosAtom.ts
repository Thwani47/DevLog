import { atom } from 'jotai'
import { Todo } from '@shared/types'

export const todosAtom = atom<Todo[]>([
  { id: '1', title: 'Fix UI bug', completed: true, date: new Date().toISOString().split('T')[0] },
  {
    id: '2',
    title: 'Write unit tests',
    completed: false,
    date: new Date().toISOString().split('T')[0]
  }
])
