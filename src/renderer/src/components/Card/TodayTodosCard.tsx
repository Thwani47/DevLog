import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  activeSidebarAtom,
  completedTodosAtom,
  deleteTodoAtom,
  editTodoAtom,
  todayTodosAtom
} from '@/store'
import { Button } from 'primereact/button'
import { ContextMenu } from 'radix-ui'
import { TODO_SCREEN } from '@renderer/utils'
import { Todo } from '@shared/models'

export const TodayTodosCard = ({ className, ...props }: ComponentProps<'div'>) => {
  const todayTodos = useAtomValue(todayTodosAtom)
  const completedTodos = useAtomValue(completedTodosAtom)
  const editTodo = useSetAtom(editTodoAtom)
  const deleteTodo = useSetAtom(deleteTodoAtom)

  const setActiveItem = useSetAtom(activeSidebarAtom)

  const toggleTodo = (todo: Todo) => {
    todo.completed = !todo.completed
    editTodo(todo)
  }

  const handleDelete = (todo: Todo) => {
    deleteTodo(todo)
  }

  return (
    <div
      {...props}
      className={twMerge(
        'p-4 bg-zinc-800 border border-white/10 rounded-lg shadow-md transition cursor-pointer flex flex-col',
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <h3 className="text-md lg:text-lg font-semibold text-white ">Today&apos;s Todos</h3>
        <div className="flex flex-col items-start mt-2 mb-2 lg:mt-0 lg:mb-0">
          <span className="text-xs lg:text-sm text-gray-400">
            {completedTodos.length}/{todayTodos.length} Done
          </span>
          <p className="mt-auto text-gray-400 text-xs lg:text-sm ">
            {completedTodos.length < todayTodos.length
              ? 'Keep going! Finish your tasks.'
              : 'No todos for today!'}
          </p>
        </div>
      </div>

      <ul>
        {todayTodos.map((todo) => (
          <ContextMenu.Root key={todo._id}>
            <ContextMenu.Trigger asChild>
              <div className="mt-2 h-10 border border-zinc-700/70 rounded-md transition-transform hover:scale-105 flex items-center px-2 cursor-pointer">
                <span
                  className={twMerge(
                    'rounded-full w-3 h-3 mr-2',
                    todo.completed ? 'bg-green-500' : 'bg-red-500'
                  )}
                />
                <span
                  className={
                    todo.completed
                      ? 'line-through text-gray-300 text-xs lg:text-lg'
                      : 'text-white text-xs lg:text-lg'
                  }
                >
                  {todo.title}
                </span>
              </div>
            </ContextMenu.Trigger>

            {/* Context Menu */}
            <ContextMenu.Portal>
              <ContextMenu.Content className="bg-zinc-700/80 border border-zinc-400 text-white p-2 rounded-md shadow-md w-40">
                {todo.completed === true ? (
                  <ContextMenu.Item
                    className="px-3 py-2 rounded-md cursor-pointer hover:border hover:border-zinc-400"
                    onClick={() => toggleTodo(todo)}
                  >
                    🔄 Re-Open
                  </ContextMenu.Item>
                ) : (
                  <ContextMenu.Item
                    className="px-3 py-2  rounded-md cursor-pointer hover:border hover:border-zinc-400"
                    onClick={() => toggleTodo(todo)}
                  >
                    ✅ Complete
                  </ContextMenu.Item>
                )}
                <ContextMenu.Item
                  className="px-3 py-2 rounded-md cursor-pointer text-red-400 hover:border hover:border-zinc-400"
                  onClick={() => handleDelete(todo)}
                >
                  🗑 Delete
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Portal>
          </ContextMenu.Root>
        ))}
      </ul>

      <Button
        label="View All Todos"
        className="mt-auto w-full text-xs lg:text-lg bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-transform hover:scale-105"
        onClick={() => setActiveItem(TODO_SCREEN)}
      />
    </div>
  )
}
