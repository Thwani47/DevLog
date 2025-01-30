import { Sidebar, Layout, Content, DraggableTopBar } from '@/components'
import { useRef } from 'react'
function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  const contentContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <DraggableTopBar />
      <Layout>
        <Sidebar className="p-2">
          <h1 className="text-2xl font-bold">Sidebar</h1>
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <h1>Hello World</h1>
          <button onClick={ipcHandle}>Ping</button>
        </Content>
      </Layout>
    </>
  )
}

export default App
