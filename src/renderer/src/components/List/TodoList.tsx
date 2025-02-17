import { Todo } from '@shared/models'
import { ComponentProps } from 'react'

export type TodoListProps = ComponentProps<'div'> & {
  todos: Todo[]
  priority: string
  filter: string
}
export const TodoList = ({ className, todos, priority, filter, ...props }: TodoListProps) => {
  console.log(todos, filter)
  return (
    <div className={className} {...props}>
      <div className="mt-4">
        {todos
          .filter((todo) => todo.priority === priority)
          .map((todo) => (
            <div
              key={todo._id}
              className="p-3 border border-zinc-500/50 rounded-lg flex flex-row justify-between"
            >
              <div className="flex flex-row items-center space-x-2">
                <div className="h-10 w-10 rounded-full border border-zinc-600/50"></div>
                <p>{todo.title}</p>
              </div>
              <div className="flex items-center">{todo.dueDate.toISOString()}</div>
            </div>
          ))}
      </div>
    </div>
  )
}
