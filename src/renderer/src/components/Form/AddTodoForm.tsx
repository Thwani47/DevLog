import { useForm } from '@tanstack/react-form'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Chips } from 'primereact/chips'
import { InputTextarea } from 'primereact/inputtextarea'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type AddTodoFormProps = ComponentProps<'form'> & {
  title?: string
}

export const AddTodoForm = ({ className, title }: AddTodoFormProps) => {
  const form = useForm({
    defaultValues: {
      title: title || '',
      tags: [],
      dueDate: null,
      description: ''
    },
    onSubmit: async (values) => {
      console.log(values)
    }
  })

  return (
    <form
      className={twMerge('space-y-4 p-4 bg-transparent rounded-lg flex flex-col', className)}
      onSubmit={form.handleSubmit}
    >
      <form.Field name="title">
        {(field) => (
          <FloatLabel>
            <InputText
              id="title"
              onBlur={field.handleBlur}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full border border-zinc-900 p-2 rounded-md mb-2"
            />
            <label htmlFor="title">Title</label>
          </FloatLabel>
        )}
      </form.Field>

      <form.Field name="tags" mode="array">
        {(field) => (
          <FloatLabel>
            <Chips
              id="tags"
              onBlur={field.handleBlur}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full border border-zinc-900 p-2 rounded-md mb-4"
              separator=","
            />
            <label htmlFor="tags">Tags (comma-separated)</label>
          </FloatLabel>
        )}
      </form.Field>

      <form.Field name="dueDate">
        {(field) => (
          <FloatLabel>
            <Calendar
              id="dueDate"
              onBlur={field.handleBlur}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="w-full border border-zinc-900 p-2 rounded-md mb-2 "
              dateFormat="dd/mm/yy"
              showIcon
            />
            <label htmlFor="dueDate">Due Date</label>
          </FloatLabel>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <FloatLabel>
            <InputTextarea
              id="description"
              onBlur={field.handleBlur}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={4}
              className="w-full border border-zinc-900 p-2 rounded-md mb-2"
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>
        )}
      </form.Field>

      <Button
        label="Submit"
        type="submit"
        className="w-24 h-8 rounded-md text-white bg-[#007ad9] m-auto"
      />
    </form>
  )
}
