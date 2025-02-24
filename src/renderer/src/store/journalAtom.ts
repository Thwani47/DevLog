import { JournalEntry } from '@shared/models'
import { atom } from 'jotai'
import { unwrap } from 'jotai/utils'

const editorTemplates = [
  {
    title: 'Blank entry',
    content: ''
  },
  {
    title: "I'm grateful for",
    content: `### I'm Grateful For:
    >
### Today, I appreciate:
>

### Something that made me smile:
>

### A small win I had:
> 

### A lesson I learned
> 

### Someone who made a difference in my day:
>
`
  },
  {
    title: 'I feel...',
    content: `### I Feel...
>
### Why do I feel this way?
> 
### What can I do to enhance or manage this feeling?
>
#### If I'm happy, how can I spread this joy?:
> 
#### If I'm feeling down, what can I do to lift my mood?:
>
`
  },
  {
    title: 'Weekly recap',
    content: `## 📅 Weekly Recap

### ✅ Wins of the Week:
#### Biggest achievement 🏆:
> 
#### Something new I learned 🚀:
>
#### A challenge I overcame 💡:  
>

### 🛠️ Things to Improve:
####  What could have gone better 🔄 ?  
>
####  How can I make next week even better 🎯?
>

### 🌟 Moments to Remember:
#### A meaningful conversation 💬 :
>
#### A memorable experience  🏞️ :
>
#### Something I’m grateful for this week ❤️ :
>
`
  }
]

export const journalTemplatesAtom = atom(editorTemplates)

const getJournalEntries = async () => {
  const entries = await window.context.getJournalEntries()
  return entries
}

export const journalEntriesAtomAsync = atom<JournalEntry[] | Promise<JournalEntry[]>>(
  getJournalEntries()
)

export const journalEntriesAtom = unwrap(journalEntriesAtomAsync, (prev) => prev)
