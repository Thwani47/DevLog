import { Dialog } from 'primereact/dialog'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type AddTodoDialogProps = ComponentProps<typeof Dialog> & {
  title?: string
  visible: boolean
  onHide: (visible: boolean) => void
}

export const AddTodoDialog = ({ className, visible, title, onHide }: AddTodoDialogProps) => {
  return (
    <Dialog
      header="Add Todo"
      visible={visible}
      className={twMerge('w-[50vw]', className)}
      onHide={() => onHide(false)}
    >
      {title ? <h1 className="text-xl font-semibold">{title}</h1> : <h1>No title</h1>}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quo, nihil id corporis
        veniam explicabo? Voluptatibus obcaecati temporibus aperiam corrupti dignissimos dolorem
        officiis deleniti optio odit sapiente, est culpa iure?
      </p>
    </Dialog>
  )
}
