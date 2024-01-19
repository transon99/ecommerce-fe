import { UseFormRegister } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props {
  type: React.HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  defaulValue?: string | number
}

export const Input = ({ type, name, register, className, placeholder, defaulValue }: Props) => {
  return (
    <div className={twMerge('z-0', className)}>
      <input
        type={type}
        className='dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]'
        id='name'
        placeholder={placeholder}
        defaultValue={defaulValue}
        {...register(name)}
      />
    </div>
  )
}
