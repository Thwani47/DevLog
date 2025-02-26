import { AppSettings } from '@shared/types'
import { atom } from 'jotai'

const defaultSettings: AppSettings = {
  editor: 'markdown'
}
export const applicationSettingsAtom = atom<AppSettings>(defaultSettings)
