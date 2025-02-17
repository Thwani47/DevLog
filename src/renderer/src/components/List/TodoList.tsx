import { formatDueDate } from '@/utils'
import { editTodoAtom } from '@renderer/store'
import { Todo } from '@shared/models'
import { useSetAtom } from 'jotai'
import { ComponentProps } from 'react'

export type TodoListProps = ComponentProps<'div'> & {
  todos: Todo[]
  priority: string
  filter: string
}
export const TodoList = ({ className, todos, priority, filter, ...props }: TodoListProps) => {
  const editTodo = useSetAtom(editTodoAtom)
  return (
    <div className={className} {...props}>
      <div className="mt-4">
        {todos
          .filter((todo) => todo.priority === priority)
          .map((todo) => {
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
                <div
                  className={`flex items-center ${color} ${todo.completed ? 'line-through' : ''}`}
                >
                  {text}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
