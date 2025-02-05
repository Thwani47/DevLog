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
      className={twMerge('space-y-4 p-4 bg-zinc-800 rounded-lg', className)}
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
            />
            <label htmlFor="description">Description</label>
          </FloatLabel>
        )}
      </form.Field>

      {/* Submit Button */}
      <Button label="Submit" type="submit" className="w-full bg-blue-600" />
    </form>
  )
}
// export const AddTodoForm = ({ className, title }: AddTodoFormProps) => {
//   const form = useForm({
//     defaultValues: {
//       title: title || ''
//     },
//     onSubmit: async ({ value }) => {
//       console.log(value)
//     }
//   })

//   return (
//     <form
//       className={twMerge('', className)}
//       onSubmit={(e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         form.handleSubmit()
//       }}
//     >
//       <div className="flex flex-col space-y-4 p-4">
//         <form.Field name="title">
//           {(field) => (
//             <FloatLabel>
//               <InputText
//                 id="title"
//                 onBlur={field.handleBlur}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//               <label htmlFor="title">Title</label>
//             </FloatLabel>
//           )}
//         </form.Field>
//         <Button label="Submit" type="submit" />
//       </div>
//     </form>
//   )
// }
