import { headingsPlugin, MDXEditor, quotePlugin, linkPlugin, listsPlugin } from '@mdxeditor/editor'
import dayjs from 'dayjs'
import { ComponentProps } from 'react'

export type JournalEditorProps = ComponentProps<'div'> & {
  intialContent: string
}

export const JournalEditor = ({ intialContent }: JournalEditorProps) => {
  const now = dayjs().format('YYYY-MM-DD')

  return (
    <div className="p-2">
      <div className="flex justify-center pt-2 mt-2">
        <span className="text-gray-400">{now}</span>
      </div>
      <MDXEditor
        markdown={intialContent}
        placeholder="Hello World!!!"
        plugins={[headingsPlugin(), linkPlugin(), quotePlugin(), listsPlugin()]}
        contentEditableClassName="border border-zinc-400/20 mt-2 outline-none h-[90vh] max-w-none text-lg px-8 py-5 caret-yellow-500 prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-['']"
      />
    </div>
  )
}
