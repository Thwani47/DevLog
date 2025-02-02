import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { twMerge } from 'tailwind-merge'
import { ComponentProps } from 'react'
import { useAtomValue } from 'jotai'
import { recentTILsSummaryAtom } from '@/store'
import { RecentTILSummaryCard } from './RecentTILSummaryCard'

export const RecentTILsCard = ({ className, ...props }: ComponentProps<typeof Card>) => {
  const recentTILs = useAtomValue(recentTILsSummaryAtom)
  return (
    <Card
      className={twMerge('p-4 bg-zinc-800 border border-white/10 rounded-lg', className)}
      {...props}
    >
      <h2 className="text-md lg:text-xl font-semibold text-white">I recently learned this</h2>

      <div className="mt-2 space-y-3">
        {recentTILs.length > 0 ? (
          recentTILs.map((til) => <RecentTILSummaryCard til={til} key={til.id} />)
        ) : (
          <p className="text-gray-400 text-sm">No recent TILs found.</p>
        )}
      </div>

      <Button
        label="View All"
        className="w-full mt-4 text-xs lg:text-lg bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-transform hover:scale-105"
        onClick={() => console.log('View All')}
      />
    </Card>
  )
}
