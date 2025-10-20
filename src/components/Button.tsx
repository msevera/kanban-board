import React from 'react';
import { twMerge } from 'tailwind-merge'

type ButtonType = {
  children: React.ReactNode
  onClick?: () => void
  className?: string,
  primary?: boolean
  ghost?: boolean
  sm?: boolean
}
export const Button = ({ children, className, onClick, primary, ghost, sm }: ButtonType) => {
  return <button className={
    twMerge(
      `bg-gray-50 hover:bg-gray-200 transition-colors duration-300 cursor-pointer px-3 py-1 rounded-xl text-sm`,
      primary && 'bg-blue-400 text-white hover:bg-blue-500',
      ghost && 'bg-transparent text-gray-500 hover:text-gray-950',
      sm && 'text-xs',
      className
    )
  }
    onClick={onClick}>
    {children}
  </button>
}