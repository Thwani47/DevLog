import {
  TODO_OVERDUE,
  TODO_PRIORITY_HIGH,
  TODO_PRIORITY_LOW,
  TODO_PRIORITY_MEDIUM,
  TODOS_TODAY,
  TODOS_WEEK
} from '@renderer/utils'
import { SelectButton } from 'primereact/selectbutton'
import { InputText } from 'primereact/inputtext'
import { FloatLabel } from 'primereact/floatlabel'
import { RadioButton } from 'primereact/radiobutton'
import { AddTodoDialog, TodoList } from '@/components'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { useAtomValue } from 'jotai'
import { allTodosAtom } from '@renderer/store'

export const Todos = () => {
  const [todosFilter, setTodosFilter] = useState<string>(TODOS_TODAY)
  const [todoTitle, setTodoTitle] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [todoPriority, setTodoPriority] = useState<string>(TODO_PRIORITY_HIGH)
  const todos = useAtomValue(allTodosAtom)

  const handleCancelAddTodo = () => {
    setVisible(false)
    setTodoTitle('')
  }

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
              className="h-10 w-full bg-transparent border border-gray-500 text-white focus:border-white focus:ring-0 px-2"
            />
            <label
              htmlFor="todoInput"
              className="text-gray-200 peer-focus:text-white peer-focus:top-0 peer-focus:text-lg"
            >
              I want to...
            </label>
          </FloatLabel>
          <Button
            icon="pi pi-plus"
            severity="info"
            rounded
            className="bg-[#007ad9] h-10 w-10 mt-2"
            disabled={todoTitle.length === 0}
            onClick={() => setVisible(true)}
          />
        </div>
        <AddTodoDialog visible={visible} onHide={handleCancelAddTodo} title={todoTitle} />
      </div>
      <div className="px-4">
        <div className="mt-2">
          <div className="flex flex-wrap gap-3">
            <div className="flex align-items-center">
              <RadioButton
                inputId="priorityHigh"
                name="high"
                value={TODO_PRIORITY_HIGH}
                onChange={(e) => setTodoPriority(e.value)}
                checked={todoPriority === TODO_PRIORITY_HIGH}
              />
              <label htmlFor="priorityHigh" className="ml-2">
                High
              </label>
            </div>

            <div className="flex align-items-center">
              <RadioButton
                inputId="priorityMedium"
                name="medium"
                value={TODO_PRIORITY_MEDIUM}
                onChange={(e) => setTodoPriority(e.value)}
                checked={todoPriority === TODO_PRIORITY_MEDIUM}
              />
              <label htmlFor="priorityMedium" className="ml-2">
                Medium
              </label>
            </div>

            <div className="flex align-items-center">
              <RadioButton
                inputId="priorityLow"
                name="low"
                value={TODO_PRIORITY_LOW}
                onChange={(e) => setTodoPriority(e.value)}
                checked={todoPriority === TODO_PRIORITY_LOW}
              />
              <label htmlFor="priorityLow" className="ml-2">
                Low
              </label>
            </div>
          </div>
          <TodoList todos={todos} priority={todoPriority} filter={todosFilter} />
        </div>
      </div>
    </div>
  )
}
