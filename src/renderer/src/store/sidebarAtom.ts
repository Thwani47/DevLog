import { DASHBOARD_SCREEN } from '@/utils'
import { atom } from 'jotai'

export const activeSidebarAtom = atom<string>(DASHBOARD_SCREEN)
