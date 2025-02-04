import { TODO_OVERDUE, TODOS_TODAY, TODOS_WEEK } from '@renderer/utils'
import { SelectButton } from 'primereact/selectbutton'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import { useState } from 'react'
import { Button } from 'primereact/button'

export const Todos = () => {
  const [todosFilter, setTodosFilter] = useState<string>(TODOS_TODAY)
  const [todoTitle, setTodoTitle] = useState<string>('')

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-zinc-300/90 ml-4 mt-4">Todo Management</h1>
      <div className="mt-4">
        <SelectButton
          className="ml-4"
          options={[TODOS_TODAY, TODOS_WEEK, TODO_OVERDUE]}
          value={todosFilter}
          onChange={(e) => setTodosFilter(e.value)}
        />
        <div className="p-4 w-full flex flex-row justify-between mt-4 space-x-2">
          <FloatLabel className="flex-1 mt-2">
            <InputText
              id="todoInput"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              className="h-10 w-full bg-transparent border border-gray-500 text-white focus:border-white focus:ring-0"
            />
            <label
              htmlFor="todoInput"
              className="text-gray-200 peer-focus:text-white peer-focus:top-0 peer-focus:text-lg"
            >
              Add Todo
            </label>
          </FloatLabel>
          <Button
            icon="pi pi-plus"
            severity="info"
            rounded
            className="bg-[#007ad9] h-10 w-10 mt-2"
            disabled={todoTitle.length === 0}
          />
        </div>
      </div>
    </div>
  )
}
