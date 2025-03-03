import { ActionButton, AddTodoDialog, RecentTILsCard, TodayTodosCard } from '@/components'
import { useState } from 'react'

export const Dashboard = () => {
  const [isAddTodoDialogVisible, setAddTodoDialogVisible] = useState<boolean>(false)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-zinc-300/90 ml-2 mt-4">Dashboard</h1>
      {/* Quick Actions */}
      <div className="mt-4">
        <p className="font-semibold text-xl text-zinc-300 ml-2">Quick Actions</p>
        <div className="flex flex-row space-x-2 justify-between  h-10 px-2 mt-2 mb-2">
          <ActionButton
            icon="pi pi-pen-to-square"
            label="Add Todo"
            severity="info"
            className="bg-blue-500/60"
            onClick={() => setAddTodoDialogVisible(true)}
          />
          <ActionButton
            icon="pi pi-lightbulb"
            label="New TIL Entry"
            severity="info"
            className="bg-blue-500/60"
          />
        </div>
      </div>
      {/* Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        <TodayTodosCard />
        <RecentTILsCard />
      </div>
      <AddTodoDialog
        visible={isAddTodoDialogVisible}
        onHide={() => setAddTodoDialogVisible(false)}
      />
    </div>
  )
}
