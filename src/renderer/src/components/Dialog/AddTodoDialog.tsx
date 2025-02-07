import { Dialog } from 'primereact/dialog'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { AddTodoForm } from '@/components'

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
      headerClassName="bg-zinc-800 text-white"
      contentClassName="bg-white"
      onHide={() => onHide(false)}
    >
      <AddTodoForm title={title} onFormSubmit={onHide} />
    </Dialog>
  )
}
