import {
  headingsPlugin,
  MDXEditor,
  quotePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods
} from '@mdxeditor/editor'
import dayjs from 'dayjs'
import { Button } from 'primereact/button'
import { ComponentProps, useRef } from 'react'

export type JournalMarkdownEditorProps = ComponentProps<'div'> & {
  initialContent: string
  handleCancel: () => void
  handleSave: (content: string, utcCreateDateTime: Date) => void
}

export const JournalMarkdownEditor = ({
  initialContent,
  handleCancel,
  handleSave
}: JournalMarkdownEditorProps) => {
  const now = dayjs().format('YYYY-MM-DD')
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
              const content = ref.current?.getMarkdown()

              if (!content) {
                return
              }
              handleSave(content, new Date())
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
      <MDXEditor
        markdown={initialContent}
        ref={ref}
        plugins={[
          headingsPlugin(),
          linkPlugin(),
          quotePlugin(),
          listsPlugin(),
          //   codeBlockPlugin(), TODO: fix this
          markdownShortcutPlugin()
        ]}
        contentEditableClassName="mt-2 outline-none h-[90vh] max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      />
    </div>
  )
}
