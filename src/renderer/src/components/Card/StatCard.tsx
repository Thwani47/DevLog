import React, { ComponentProps } from 'react'

export type StartCardProps = ComponentProps<'div'> & {
  title: string
  value: React.ReactNode
}

export const StatCard = ({ title, value }: StartCardProps) => (
  <div className="flex-1 bg-transparent border border-zinc-500 rounded-lg p-4 shadow-sm mr-4 flex flex-col items-center justify-center">
    <div className="text-zinc-100 text-sm font-bold mb-1">{title}</div>
    <span className="text-2xl font-semibold text-zinc-100">{value}</span>
  </div>
)
