import {
  Sidebar,
  Layout,
  Content,
  DraggableTopBar,
  SidebarList,
  SidebarListItem
} from '@/components'
import { useRef } from 'react'
import {
  BRAGBOARD_SCREEN,
  CALENDAR_SCREEN,
  DASHBOARD_SCREEN,
  GOALS_SCREEN,
  JOURNAL_SCREEN,
  SETTINGS_SCREEN,
  TIL_SCREEN,
  TODO_SCREEN
} from './utils'

function App(): JSX.Element {
  const contentContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <DraggableTopBar />
      <Layout>
        <Sidebar className="p-2">
          <SidebarList className="mt-2 space-y-1 p-2">
            <SidebarListItem
              label="Dashboard"
              icon="pi-chart-bar"
              iconColor="green"
              screenName={DASHBOARD_SCREEN}
            />
            <SidebarListItem
              label="Journal"
              icon="pi-pen-to-square"
              iconColor="cyan"
              screenName={JOURNAL_SCREEN}
            />
            <SidebarListItem
              label="Todos"
              icon="pi-list"
              iconColor="white"
              screenName={TODO_SCREEN}
            />
            <SidebarListItem
              label="TIL"
              icon="pi-lightbulb"
              iconColor="yellow"
              screenName={TIL_SCREEN}
            />
            <SidebarListItem
              label="Brag Board"
              icon="pi-star-fill"
              iconColor="gold"
              screenName={BRAGBOARD_SCREEN}
            />
            <SidebarListItem
              label="Goals"
              icon="pi-chart-line"
              iconColor="slateblue"
              screenName={GOALS_SCREEN}
            />
            <SidebarListItem
              label="Calendar"
              icon="pi-calendar"
              iconColor="skyblue"
              screenName={CALENDAR_SCREEN}
            />
            <hr className=" mt-2 border-t border-zinc-500/80" />
            <SidebarListItem
              label="Settings"
              icon="pi-cog"
              iconColor="gray"
              screenName={SETTINGS_SCREEN}
            />
          </SidebarList>
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20" />
      </Layout>
    </>
  )
}

export default App
