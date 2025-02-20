import { activeItemPageMap } from '@/utils'
import { activeSidebarAtom } from '@/store'
import { useAtomValue } from 'jotai'
import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const DraggableTopBar = () => {
  return <header className="absolute inset-0 h-8 bg-transparent" />
}
export const Layout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={twMerge('flex flex-row h-screen', className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ children, className, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge('w-[250px] mt-10 h[100vh + 10px] overflow-auto', className)}
      {...props}
    >
      <div className="flex items-center justify-center mt-2">
        <h1 className="text-2xl font-bold text-gray-400 self-center">devlog</h1>
      </div>
      {children}
    </aside>
  )
}

type ContentProps = ComponentProps<'div'>

export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ children, className, ...props }, ref) => {
    const activeItem = useAtomValue(activeSidebarAtom)
    return (
      <div ref={ref} className={twMerge('flex-1 overflow-auto', className)} {...props}>
        {activeItemPageMap(activeItem)}
      </div>
    )
  }
)

Content.displayName = 'Content'
