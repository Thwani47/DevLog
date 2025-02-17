import { useForm } from '@tanstack/react-form'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Chips } from 'primereact/chips'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Todo } from '@shared/models'
import { v4 as uuidv4 } from 'uuid'
import { useSetAtom } from 'jotai'
import { addTodoAtom } from '@renderer/store'
import dayjs from 'dayjs'
import { TODO_PRIORITY_HIGH, TODO_PRIORITY_LOW, TODO_PRIORITY_MEDIUM } from '@renderer/utils'

type AddTodoFormProps = ComponentProps<'form'> & {
  title?: string
  onFormSubmit: () => void
}

export const AddTodoForm = ({ className, title, onFormSubmit }: AddTodoFormProps) => {
  const addTodo = useSetAtom(addTodoAtom)
  const form = useForm({
    defaultValues: {
      title: title || '',
      tags: [] as string[],
      dueDate: null as Date | null,
      description: '',
      priority: ''
    },
    onSubmit: async (values) => {
      const { title, description, dueDate, tags, priority } = values.value
      const newTodo: Todo = {
        _id: uuidv4(),
        title,
        description,
        priority,
        completed: false,
        dueDate: dayjs(dueDate ? new Date(dueDate) : new Date())
          .add(1, 'hour')
          .toDate(),
        dateCreated: new Date(),
        tags
      }
      await addTodo(newTodo)
      onFormSubmit()
    }
  })

  return (
    <form
      className={twMerge('space-y-4 p-4 bg-transparent rounded-lg flex flex-col', className)}
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
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
              value={field.state.value ?? []}
              onChange={(e) => {
                if (e.value!.length <= 3) {
                  field.handleChange(e.target.value ?? [])
                }
              }}
              className="w-full border border-zinc-900 p-2 rounded-md mb-4"
              separator=","
              max={3}
            />
            <label htmlFor="tags">Tags (max 3)</label>
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
              onChange={(e) => field.handleChange(e.target.value || null)}
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

      <form.Field name="priority">
        {(field) => (
          <FloatLabel>
            <Dropdown
              id="priority"
              onBlur={field.handleBlur}
              value={field.state.value}
              options={[TODO_PRIORITY_LOW, TODO_PRIORITY_MEDIUM, TODO_PRIORITY_HIGH]}
              onChange={(e) => field.handleChange(e.value)}
              placeholder="Select a Priority"
              className="w-full border border-zinc-900 p-2 rounded-md mb-2"
            />
            <label htmlFor="priority">Priority</label>
          </FloatLabel>
        )}
      </form.Field>

      <Button
        label="Submit"
        type="submit"
        className="w-24 h-8 rounded-md text-white bg-[#007ad9] m-auto hover:transition-all hover:scale-105"
      />
    </form>
  )
}
