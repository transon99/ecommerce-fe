import Select from 'react-select'

interface Props {
  field?: any
  options?: any[] | undefined
  lable?: string
  errorMessage?: string
}

const CustomSelect = ({ field, options, lable, errorMessage }: Props) => {
  return (
    <>
      <div className='w-full md:min-w-[257px]'>
        <label htmlFor={lable} className='block mb-2 font-medium text-gray-900 dark:text-white'>
          {lable}
        </label>
        <Select {...field} id='countries' options={options} r />
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </>
  )
}

export default CustomSelect
