import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cd = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
