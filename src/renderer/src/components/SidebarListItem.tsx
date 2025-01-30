import { activeSidebarAtom } from '@/store'
import { cn } from '@/utils'
import { useAtom } from 'jotai'
import { ComponentProps } from 'react'

type SidebarListItemProps = ComponentProps<'div'> & {
  label: string
  icon?: string
  iconColor?: string
  isActive?: boolean
}
export const SidebarListItem = ({
  label,
  icon,
  iconColor,
  children,
  className,
  ...props
}: SidebarListItemProps) => {
  const [isActiveItem, setActiveItem] = useAtom(activeSidebarAtom)
  const isActive = isActiveItem === label

  return (
    <div
      className={cn(
        'cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75',
        {
          'bg-zinc-400/5': isActive,
          'hover:bg-zinc-500/75': !isActive
        },
        className
      )}
      {...props}
      onClick={() => setActiveItem(label)}
    >
      <div className="flex items-center space-x-2">
        <i className={`pi ${icon}`} style={{ fontSize: '1.5rem', color: iconColor }} />
        <h1 className="text-md">{label}</h1>
      </div>
    </div>
  )
}
