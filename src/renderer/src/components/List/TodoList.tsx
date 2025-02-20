import { formatDueDate, TODO_OVERDUE, TODOS_TODAY, TODOS_WEEK } from '@/utils'
import { editTodoAtom } from '@renderer/store'
import { Todo } from '@shared/models'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

dayjs.extend(isBetween)

export type TodoListProps = ComponentProps<'div'> & {
  todos: Todo[]
  filter: string
}
export const TodoList = ({ className, todos, filter, ...props }: TodoListProps) => {
  const editTodo = useSetAtom(editTodoAtom)
  const today = dayjs().startOf('day')
  const weekStart = today.startOf('week')
  const weekEnd = today.endOf('week')

  const filteredTodos = todos
    .filter((todo) => {
      const dueDate = dayjs(todo.dueDate).startOf('day')

      if (filter === TODOS_TODAY) {
        return dueDate.isSame(today, 'day')
      } else if (filter === TODOS_WEEK) {
        return dueDate.isBetween(weekStart, weekEnd, 'day', '[]')
      } else if (filter === TODO_OVERDUE) {
        return dueDate.isBefore(today, 'day') && !todo.completed
      }

      return true
    })
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())

  const completedTodos = filteredTodos.filter((todo) => todo.completed)
  const uncompletedTodos = filteredTodos.filter((todo) => !todo.completed)

  return (
    <div className={className} {...props}>
      <div className="mt-4">
        {uncompletedTodos.map((todo) => {
          const { text, color } = formatDueDate(todo.dueDate)
          return (
            <div
              key={todo._id}
              className="p-3 border border-zinc-500/50 rounded-lg flex mb-2 flex-row justify-between hover:transition-all hover:scale-105"
            >
              <div className="flex flex-row items-center space-x-2">
                <div
                  className={`h-10 w-10 rounded-full border border-zinc-600/50 ${todo.completed ? 'bg-green-500/70' : 'bg-red-500/70'}`}
                  onClick={() => editTodo({ ...todo, completed: !todo.completed })}
                ></div>
                <p className={todo.completed ? 'line-through' : ''}>{todo.title}</p>
              </div>
              <div className={`flex items-center ${color} ${todo.completed ? 'line-through' : ''}`}>
                {text}
              </div>
            </div>
          )
        })}
      </div>
      {uncompletedTodos.length > 0 && completedTodos.length > 0 && (
        <hr className={`mt-2 mb-2 border-t border-zinc-500`} />
      )}
      <div className="mt-4">
        {completedTodos.map((todo) => {
          const { text, color } = formatDueDate(todo.dueDate)
          return (
            <div
              key={todo._id}
              className="p-3 border border-zinc-500/50 rounded-lg flex mb-2 flex-row justify-between hover:transition-all hover:scale-105"
            >
              <div className="flex flex-row items-center space-x-2">
                <div
                  className={`h-10 w-10 rounded-full border border-zinc-600/50 ${todo.completed ? 'bg-green-500/70' : 'bg-zinc-500/10'}`}
                  onClick={() => editTodo({ ...todo, completed: !todo.completed })}
                ></div>
                <p className={todo.completed ? 'line-through' : ''}>{todo.title}</p>
              </div>
              <div className={`flex items-center ${color} ${todo.completed ? 'line-through' : ''}`}>
                {text}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
