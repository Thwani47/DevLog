import { TIL } from '@shared/types'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type RecentTILSummaryCardProps = ComponentProps<'div'> & {
  til: TIL
}

export const RecentTILSummaryCard = ({ til, className, ...props }: RecentTILSummaryCardProps) => {
  return (
    <div
      key={til.id}
      className={twMerge(
        'p-2 bg-zinc-600 rounded-md transition-transform hover:scale-105',
        className
      )}
      {...props}
    >
      <p className="text-sm font-medium text-white">{til.title}</p>
      <p className="text-xs text-gray-400">{til.date}</p>
      {til.tags && (
        <div className="mt-1 flex flex-wrap gap-1">
          {til.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs text-white bg-gray-700 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
