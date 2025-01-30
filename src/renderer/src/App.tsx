import {
  Sidebar,
  Layout,
  Content,
  DraggableTopBar,
  SidebarList,
  SidebarListItem
} from '@/components'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { activeSidebarAtom } from '@/store'
import { activeItemPageMap } from './utils/activeItemPageMap'

function App(): JSX.Element {
  const activeItem = useAtomValue(activeSidebarAtom)
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const contentContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <DraggableTopBar />
      <Layout>
        <Sidebar className="p-2">
          <SidebarList className="mt-2 space-y-1 p-2">
            <SidebarListItem label="Dashboard" icon="pi-chart-bar" iconColor="green" />
            <SidebarListItem label="Today's Todos" icon="pi-pen-to-square" iconColor="white" />
            <SidebarListItem label="TIL" icon="pi-lightbulb" iconColor="yellow" />
            <SidebarListItem label="Brag Board" icon="pi-star-fill" iconColor="gold" />
            <SidebarListItem label="Goals" icon="pi-chart-line" iconColor="slateblue" />
            <SidebarListItem label="Calendar" icon="pi-calendar" iconColor="skyblue" />
            <hr className=" mt-2 border-t border-zinc-500/80" />
            <SidebarListItem label="Settings" icon="pi-cog" iconColor="gray" />
          </SidebarList>
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          {activeItemPageMap(activeItem)}
        </Content>
      </Layout>
    </>
  )
}

export default App
