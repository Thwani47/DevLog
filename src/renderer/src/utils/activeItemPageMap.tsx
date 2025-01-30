import { Dashboard } from '@/pages'

export const activeItemPageMap = (activeItem: string) => {
  switch (activeItem) {
    case 'Dashboard':
      return <Dashboard />
    default:
      return <h1>Not Found!</h1>
  }
}
