import { StatCard } from '@/components'
import dayjs from 'dayjs'

export const Journal = () => {
  const now = dayjs().format('YYYY-MM-DD')
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          {/* TODO: Need to to add a user metadata solution */}
          <h1 className="text-2xl font-bold">Hi Thwani</h1>
          <p className="">{now}</p>
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:transition-all hover:scale-105">
          New Entry
        </button>
      </div>
      <div className="flex justify-between w-full">
        <StatCard
          title="Current Streak"
          // TODO: this needs to come from the metadata store
          value={<div className="flex items-center">7 days 🔥</div>}
        />
        <StatCard
          title="Longest Streak"
          // TODO:from the metadata store
          value={<div className="flex items-center">7 days ⭐</div>}
        />
        <StatCard title="Journal Entries" value={<div className="flex items-center">12 📝</div>} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">Morning Reflection</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Started working on the new project...
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {dayjs().subtract(index, 'day').format('MMM D')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
