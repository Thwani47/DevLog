import { StatCard, JournalEditor } from '@/components'
import { journalEntriesAtom, journalTemplatesAtom } from '@renderer/store'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { useState } from 'react'

export const Journal = () => {
  const now = dayjs().format('YYYY-MM-DD')
  const editorTemplates = useAtomValue(journalTemplatesAtom)
  const [isFocused, setIsFocused] = useState(false)
  const [editorInitialContent, setEditorInitialContent] = useState('')
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const journalEntries = useAtomValue(journalEntriesAtom)

  if (isEditorOpen) {
    return (
      <JournalEditor
        initialContent={editorInitialContent}
        handleCancel={() => setIsEditorOpen(false)}
        handleSave={(content, utcCreateDateTime) => {
          console.log(content, utcCreateDateTime)
          setIsEditorOpen(false)
        }}
      />
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          {/* TODO: Need to to add a user metadata solution */}
          <h1 className="text-2xl font-bold">Hi Thwani</h1>
          <p className="">{now}</p>
        </div>
      </div>
      <div className="flex justify-between w-full px-4">
        <StatCard
          title="Current Streak"
          // TODO: this needs to come from the metadata store
          value={<div className="flex items-center">7 days 🔥</div>}
        />
        <StatCard
          title="Longest Streak"
          // TODO:from the metadata store
          value={<div className="flex items-center">7 days ⭐</div>}
        />
        <StatCard title="Journal Entries" value={<div className="flex items-center">12 📝</div>} />
      </div>
      <div className="mt-8 p-4">
        <InputTextarea
          placeholder="What's on your mind?"
          className="w-full p-3 border border-gray-300 rounded-lg h-3 shadow-sm focus:ring focus:ring-blue-300 text-black"
          autoResize
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
        {isFocused && (
          <div className="mt-2 flex space-x-2">
            {editorTemplates.map((template) => (
              <Button
                key={template.title}
                label={template.title}
                className="p-button-sm p-button-outlined bg-zinc-500/50 rounded-lg hover:transition-all hover:scale-105 border border-gray-100/50 flex-1"
                onClick={() => {
                  setEditorInitialContent(template.content)
                  setIsEditorOpen(true)
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        {journalEntries && journalEntries.length > 0 ? (
          <div className="space-y-4">
            {journalEntries.map((entry, index) => (
              <div
                key={index}
                className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{entry.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{entry.content}</p>
                  </div>
                  <span className="text-sm text-gray-500">{dayjs(entry.date).format('MMM D')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
