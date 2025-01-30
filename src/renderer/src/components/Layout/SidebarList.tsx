import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const SidebarList = ({ children, className, ...props }: ComponentProps<'ul'>) => {
  return (
    <ul className={twMerge('flex flex-col', className)} {...props}>
      {children}
    </ul>
  )
}
