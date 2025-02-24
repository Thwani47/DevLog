import { APP_DIRECTORY_NAME } from '@shared/constants'
import { ensureDir } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/${APP_DIRECTORY_NAME}`
}

export const ensureRootDir = () => {
  ensureDir(getRootDir())
}
