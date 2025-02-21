import React, { ComponentProps } from 'react'

export type StartCardProps = ComponentProps<'div'> & {
  title: string
  value: React.ReactNode
}

export const StatCard = ({ title, value }: StartCardProps) => (
  <div className="flex-1 bg-white rounded-lg p-4 shadow-sm mr-4">
    <div className="text-gray-900 text-sm">{title}</div>
    <span className="text-2xl font-semibold text-gray-900">{value}</span>
  </div>
)
