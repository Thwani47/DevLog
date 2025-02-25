import dayjs from 'dayjs'
import { Button } from 'primereact/button'
import { Editor } from 'primereact/editor'

export const JournalQuillEditor = () => {
  const now = dayjs().format('YYYY-MM-DD')
  return (
    <div className="p-2 flex flex-col h-full">
      <div className="flex pt-2 mt-2 w-full justify-between px-4">
        <span className="text-gray-300/50 text-xl font-bold">{now}</span>
        <div className="flex space-x-2">
          <Button
            icon="pi pi-check"
            aria-label="Filter"
            className="bg-blue-700 rounded-full h-10 w-10"
            onClick={() => console.log('Save')}
          />
          <Button
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            className="bg-red-700 rounded-full h-10 w-10"
            onClick={() => console.log('Cancel')}
          />
        </div>
      </div>
      <hr className=" mt-2 border-t border-zinc-500/80 mb-4" />
      <Editor className="flex-1 max-w-none bg-white text-black" />
    </div>
  )
}
