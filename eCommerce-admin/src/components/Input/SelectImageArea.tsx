import React, { useCallback, useEffect, useState } from 'react'
import { ImageType } from '../Dialog/AddDialog/AddProductDialog'
import SelectImage from './SelectImage'
import { Button } from '@radix-ui/themes'

interface SelectImageAreaProps {
  item: ImageType
  addImageToState: (value: ImageType) => void
  removeImageFromState: (value: ImageType) => void
  isProductCreated: boolean
}

const SelectImageArea = ({ item, addImageToState, isProductCreated, removeImageFromState }: SelectImageAreaProps) => {
  const [isSelected, setIsSelected] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false)
      setFile(null)
    }
  }, [isProductCreated])

  const handleFileChange = useCallback((value: File) => {
    setFile(value)
    addImageToState({ ...item, image: value })
  }, [])

  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked)

    if (!e.target.checked) {
      setFile(null)
      removeImageFromState(item)
    }
  }, [])

  return (
    <div className='grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2'>
      <div className='flex flex-row gap-2 items-center h-[60px]'>
        <input
          type='checkbox'
          id={item.imageOrder}
          checked={isSelected}
          onChange={handleCheck}
          className='cursor-pointer '
        />
        <label htmlFor={item.imageOrder} className='font-medium cursor-pointer'>
          {' '}
          {item.imageOrder}
        </label>
      </div>
      {isSelected && !file && (
        <div className='col-span-2 text-center'>
          <SelectImage item={item} handleFileChange={handleFileChange} />
        </div>
      )}
      {file && (
        <div className='flex flex-row gap-2 text-sm col-span-2 items-center justify-between'>
          <p>{file?.name}</p>
          <div className='w-[70px]'>
            <Button
              onClick={() => {
                setFile(null)
                removeImageFromState(item)
              }}
              className='bg-[#263E7B] !cursor-pointer text-primary hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectImageArea
