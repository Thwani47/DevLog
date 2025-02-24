import {
  headingsPlugin,
  MDXEditor,
  quotePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin
} from '@mdxeditor/editor'
import dayjs from 'dayjs'
import { Button } from 'primereact/button'
import { ComponentProps } from 'react'

export type JournalEditorProps = ComponentProps<'div'> & {
  initialContent: string
  onCancel: () => void
}

export const JournalEditor = ({ initialContent, onCancel }: JournalEditorProps) => {
  const now = dayjs().format('YYYY-MM-DD')

  return (
    <div className="p-2">
      <div className="flex pt-2 mt-2 w-full justify-between px-4">
        <span className="text-gray-300/50 text-xl font-bold">{now}</span>
        <Button
          icon="pi pi-times"
          severity="danger"
          aria-label="Cancel"
          className="bg-red-700 rounded-full h-10 w-10"
          onClick={onCancel}
        />
      </div>
      <hr className=" mt-2 border-t border-zinc-500/80" />
      <MDXEditor
        markdown={initialContent}
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
