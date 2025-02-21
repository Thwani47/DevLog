import { TIL } from '@shared/models'
import { atom } from 'jotai'

export const recentTilsAtom = atom<TIL[]>([
  {
    id: 1,
    title: 'Learned about Jotai state management',
    date: 'Jan 30, 2025',
    tags: ['React', 'State']
  },
  { id: 2, title: 'Explored Tailwind v4 updates', date: 'Jan 29, 2025', tags: ['CSS', 'Tailwind'] }
])

export const recentTILsSummaryAtom = atom((get) => {
  const recentTILs = get(recentTilsAtom)
  return recentTILs.slice(0, 2)
})
