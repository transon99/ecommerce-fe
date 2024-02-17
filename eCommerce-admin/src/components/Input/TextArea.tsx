'use client'

import { UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form'

interface TextAreaProps {
  id: string
  lable?: string
  value?: string
  disabled?: boolean
  required?: boolean
  register: UseFormRegister<FieldErrors>
  errors: FieldErrors
}

export default function TextArea({ id, errors, register, disabled, lable, required, value }: TextAreaProps) {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        {lable}
      </label>
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        rows={4}
        {...register(id, { required })}
        className={` bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-70 disabled:cursor-not-allowed
        ${errors[id] ? 'border-rose-400' : 'border-slate-300'}
        ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}

        `}
      />
    </div>
  )
}
