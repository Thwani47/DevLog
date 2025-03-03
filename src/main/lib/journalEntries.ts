import { APP_DIRECTORY_NAME } from '@shared/constants'
import { GetJournalEntries, SaveJournalEntry } from '@shared/types'
import { homedir } from 'os'
import PouchDB from 'pouchdb'
import { ensureRootDir, getRootDir } from './utils'
import { JournalEntry } from '@shared/models'
import { writeFile } from 'fs-extra'

const journalEntriesDb = new PouchDB('journalEntries', {
  prefix: `${homedir()}/${APP_DIRECTORY_NAME}/`
})

export const saveJournalEntry: SaveJournalEntry = async (entry) => {
  ensureRootDir()
  console.log('Writing entry to file: ', entry)
  writeFile(`${getRootDir()}/journalEntries/entries/${entry.title}.md`, entry.content, {
    encoding: 'utf8'
  })

  console.log('writing entry to DB')
  const result = await journalEntriesDb.put(entry)
  return { ...entry, _id: result.id, _rev: result.rev }
}

export const getJournalEntries: GetJournalEntries = async () => {
  ensureRootDir()

  const entries = await journalEntriesDb.allDocs({ include_docs: true })

  return entries.rows
    .map((row) => {
      if (!row.doc) {
        return null
      }

      const doc = row.doc as unknown as JournalEntry

      return {
        _id: doc._id,
        title: doc.title ?? '',
        date: doc.date,
        content: doc.content
      } as JournalEntry
    })
    .filter((entry): entry is JournalEntry => entry !== null)
}
