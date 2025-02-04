import { Button } from 'primereact/button'
import { twMerge } from 'tailwind-merge'
import { ComponentProps } from 'react'
import { useAtomValue } from 'jotai'
import { recentTILsSummaryAtom } from '@/store'
import { RecentTILSummaryCard } from './RecentTILSummaryCard'

export const RecentTILsCard = ({ className, ...props }: ComponentProps<'div'>) => {
  const recentTILs = useAtomValue(recentTILsSummaryAtom)
  return (
    <div
      className={twMerge(
        'p-4 bg-zinc-800 border border-white/10 rounded-lg shadow-md transition cursor-pointer flex flex-col space-y-1',
        className
      )}
      {...props}
    >
      <div className="p-2 mb-2">
        <h2 className="text-md lg:text-xl font-semibold text-white">I recently learned this</h2>
      </div>
      <div className="space-y-3">
        {recentTILs.length > 0 ? (
          recentTILs.map((til) => <RecentTILSummaryCard til={til} key={til.id} />)
        ) : (
          <p className="text-gray-400 text-sm">No recent TILs found.</p>
        )}
      </div>

      <Button
        label="View All"
        className="mt-auto w-full text-xs lg:text-lg bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-transform hover:scale-105"
        onClick={() => console.log('View All')}
      />
    </div>
  )
}
