import { differenceInDays, format, isToday, isTomorrow, isYesterday } from 'date-fns'

export type DueDateFormat = {
  text: string
  color: string
}

export const formatDueDate = (date: Date): DueDateFormat => {
  const today = new Date()

  if (isToday(date)) {
    return { text: 'Due Today', color: 'text-blue-500' }
  } else if (isTomorrow(date)) {
    return { text: 'Due Tomorrow', color: 'text-green-500' }
  } else if (isYesterday(date)) {
    return { text: 'Due Yesterday', color: 'text-red-500' }
  } else {
    const daysDifference = differenceInDays(date, today)
    const formattedDate = format(date, 'dd-MM-yyyy')
    const color = daysDifference < 0 ? 'text-red-500' : 'text-green-500'

    return { text: `Due ${formattedDate}`, color }
  }
}

export const getTodayLocale = (): string => {
  return toLocaleDateString(new Date())
}

export const toLocaleDateString = (date: Date): string => {
  return date.toLocaleDateString('en-ZA').split('T')[0]
}
