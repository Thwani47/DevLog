import { Dashboard, Todos } from '@/pages'
import { DASHBOARD_SCREEN, TODO_SCREEN } from '@/utils'

export const activeItemPageMap = (activeItem: string) => {
  switch (activeItem) {
    case DASHBOARD_SCREEN:
      return <Dashboard />
    case TODO_SCREEN:
      return <Todos />
    default:
      return <h1>Not Found!</h1>
  }
}
