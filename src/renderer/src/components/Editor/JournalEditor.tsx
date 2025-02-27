import { MDXEditorMethods } from '@mdxeditor/editor'
import { applicationSettingsAtom } from '@/store'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { ComponentProps, useRef, useState } from 'react'
import { JournalMarkdownEditor } from './JournalMarkdownEditor'
import { JournalQuillEditor } from './JournalQuillEditor'

export type JournalEditorProps = ComponentProps<'div'> & {
  initialContent: string
  handleCancel: () => void
  handleSave: (title: string, content: string, utcCreateDateTime: Date) => void
}

export const JournalEditor = ({ initialContent, handleCancel, handleSave }: JournalEditorProps) => {
  const now = dayjs().format('YYYY-MM-DD')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const appSettings = useAtomValue(applicationSettingsAtom)
  const ref = useRef<MDXEditorMethods>(null)

  return (
    <div className="p-2">
      <div className="flex pt-2 mt-2 w-full justify-between px-4">
        <span className="text-gray-300/50 text-xl font-bold">{now}</span>
        <div className="flex space-x-2">
          <Button
            icon="pi pi-check"
            aria-label="Filter"
            className="bg-blue-700 rounded-full h-10 w-10"
            onClick={() => {
              if (!title.trim()) {
                setError('Title is required')
                return
              }

              const content = ref.current?.getMarkdown()

              if (!content) {
                return
              }
              setError(null)
              handleSave(title, content, new Date())
            }}
          />
          <Button
            icon="pi pi-times"
            severity="danger"
            aria-label="Cancel"
            className="bg-red-700 rounded-full h-10 w-10"
            onClick={handleCancel}
          />
        </div>
      </div>
      <hr className=" mt-2 border-t border-zinc-500/80" />
      <div className="flex p-4">
        <InputText
          placeholder="Title"
          value={title}
          invalid={true}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-3 border rounded-lg h-10 shadow-sm focus:ring ${
            error
              ? 'border-red-500 border-2 focus:ring-red-300'
              : 'border-gray-300 focus:ring-blue-300'
          } text-black`}
        />
      </div>
      <div className="p-4 flex flex-col h-screen">
        {appSettings.editor === 'markdown' ? (
          <JournalMarkdownEditor ref={ref} initialContent={initialContent} />
        ) : (
          <JournalQuillEditor />
        )}
      </div>
    </div>
  )
}
