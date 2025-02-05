import { Button } from 'primereact/button'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type ActionButtonProps = ComponentProps<'button'> & {
  icon: string
  label: string
  severity: string
  onClick?: () => void
}

export const ActionButton = ({ icon, label, className, onClick }: ActionButtonProps) => {
  return (
    <Button
      icon={icon}
      label={label}
      onClick={onClick}
      rounded
      className={twMerge(
        'space-x-2 rounded-md p-2 w-40 text-sm transition-transform duration-200 ease-in-out hover:scale-105 ',
        className
      )}
    />
  )
}
