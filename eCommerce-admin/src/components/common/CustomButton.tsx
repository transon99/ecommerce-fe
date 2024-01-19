import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { CgSpinner } from 'react-icons/cg'

interface ButttonProps {
  children: ReactNode
  className?: string
  handleClick?: () => void
  type?: 'submit' | 'reset' | 'button' | undefined
  disabled?: boolean
}

function CustomButton({ children, className, disabled, handleClick, type }: ButttonProps) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={twMerge(
        clsx(
          'py-3 px-4 text-primary flex justify-center items-center gap-3 rounded-full tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:shadow-outline focus:outline-none',
          className,
          disabled && 'opacity-50'
        )
      )}
      disabled={disabled}
    >
      {disabled && (
        <span className='animate-spin'>
          <CgSpinner />
        </span>
      )}
      {children}
    </button>
  )
}

export default CustomButton
