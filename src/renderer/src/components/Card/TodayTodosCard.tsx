import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Card } from 'primereact/card'
import { useAtomValue } from 'jotai'
import { todosAtom } from '@/store'
type TododayTodosCardProps = ComponentProps<typeof Card> & {
  onClick: () => void
}

export const TodayTodosCard = ({ onClick, className, ...props }: TododayTodosCardProps) => {
  const todos = useAtomValue(todosAtom)
  const today = new Date().toISOString().split('T')[0]

  const todayTodos = todos.filter((todo) => todo.date === today)
  const completedTodos = todayTodos.filter((todo) => todo.completed).length
  const totalTodos = todayTodos.length

  return (
    <Card
      {...props}
      className={twMerge(
        'p-4 bg-zinc-800 border border-white/10 rounded-lg shadow-md hover:bg-zinc-700 transition cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Today&apos;s Todos</h3>
        <span className="text-sm text-gray-400">
          {completedTodos}/{totalTodos} Done
        </span>
      </div>

      <ul>
        {todayTodos.map((todo) => (
          <li key={todo.id} className="mt-2 flex items-center">
            <span
              className={twMerge(
                'rounded-full w-3 h-3 mr-2',
                todo.completed ? 'bg-green-500' : 'bg-red-500'
              )}
            />
            <span className={todo.completed ? 'line-through text-gray-300' : 'text-white'}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-gray-300 text-sm">
        {completedTodos < totalTodos ? 'Keep going! Finish your tasks.' : 'No todos for today!'}
      </p>
    </Card>
  )
}
