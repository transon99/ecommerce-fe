interface Props {
  field: any
  data: any[] | undefined
  name?: string
  value?: any
  lable?: string
}

const ListBox = ({ field, data, name, value, lable }: Props) => {
  return (
    <>
      <div className='w-full md:min-w-[257px]'>
        <label htmlFor={lable} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {lable}
        </label>
        <select
          {...field}
          id='countries'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          value={value || 'DEFAULT'}
        >
          <option value='DEFAULT' disabled>
            {name}
          </option>
          {data?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default ListBox
