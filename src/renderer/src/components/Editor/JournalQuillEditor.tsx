import { Editor } from 'primereact/editor'

export const JournalQuillEditor = () => {
  return (
    <div className="p-2 flex flex-col h-full">
      <hr className=" mt-2 border-t border-zinc-500/80 mb-4" />
      <Editor className="flex-1 max-w-none bg-white text-black" />
    </div>
  )
}
