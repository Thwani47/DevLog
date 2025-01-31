import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { useAtomValue } from 'jotai'
import { completedTodosAtom, todayTodosAtom } from '@/store'

export const TodayTodosCard = ({ className, ...props }: ComponentProps<'div'>) => {
  const todayTodos = useAtomValue(todayTodosAtom)
  const completedTodos = useAtomValue(completedTodosAtom)

  return (
    <div
      {...props}
      className={twMerge(
        'p-4 bg-zinc-800 border border-white/10 rounded-lg shadow-md hover:bg-zinc-700 transition cursor-pointer flex flex-col',
        className
      )}
      onClick={() => console.log('Clicked')}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Today&apos;s Todos</h3>
        <span className="text-sm text-gray-400">
          {completedTodos.length}/{todayTodos.length} Done
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

      <p className="mt-auto text-gray-400 text-sm ">
        {completedTodos.length < todayTodos.length
          ? 'Keep going! Finish your tasks.'
          : 'No todos for today!'}
      </p>
    </div>
  )
}
