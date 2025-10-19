import { twMerge } from 'tailwind-merge'
import type { TaskType } from '../types'

type IndicatorType = {
  type: TaskType
}

export const Indicator = ({ type }: IndicatorType) => {
  return (
    <div className={twMerge('w-2 h-2 rounded-full mr-2',
      type === 'ToDo' && 'bg-zinc-200',
      type === 'InProgress' && 'bg-yellow-400',
      type === 'Done' && 'bg-green-400'
    )} />
  )
}