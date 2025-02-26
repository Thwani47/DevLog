import {
  headingsPlugin,
  MDXEditor,
  quotePlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditorMethods
} from '@mdxeditor/editor'
import { RefObject } from 'react'

export type MarkdownEditorProps = {
  ref: RefObject<MDXEditorMethods>
  initialContent: string
}
export const JournalMarkdownEditor = ({ initialContent, ref }: MarkdownEditorProps) => {
  return (
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
  )
}
