import { FaPencil } from 'react-icons/fa6'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import * as React from 'react'
import { PiPlusCircleBold } from 'react-icons/pi'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import axiosClient from '@/axios/axiosClient'
import ListBox from '@/components/Input/ListBox'
import { API_URL_CATEGORY, API_URL_PRODUCT } from '@/constant/apiConstant'
import { Button } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import FileInput from '../Input/FileInputSingle'
import { Input } from '../Input/Input'
import CustomButton from '../common/CustomButton'
import './index.css'
import ActionBtn from '../ActionBtn'
import { MdEdit } from 'react-icons/md'
import FileInputMutiple from '../Input/FileInputMutiple'

interface PropTypes {
  varient: string
  dataProps?: Product
  categoriesData?: Category[]
  brandsData?: Brand[]
}

interface InputProps {
  textProps: string
}

const TextH = ({ textProps }: InputProps) => {
  return <p className='text-primary my-2'>{textProps}</p>
}

const AddProductDialog = ({ varient, dataProps, categoriesData, brandsData }: PropTypes) => {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { register, handleSubmit, control } = useForm()

  const handleEditProduct = async (data: any, dataProps: Category | undefined) => {
    console.log('dataPro', dataProps)
    console.log('data:', data)
    const reqConfig: CategoryRequest = {
      name: data.name
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify(reqConfig))
    formData.append('image', data.imageUrl[0])
    console.log('Form data', [...formData])
    setIsLoading(true)
    const result: responseType = await axiosClient.put(`${API_URL_CATEGORY}/${dataProps?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setIsLoading(false)

    if (result.status === 'OK') {
      Swal.fire({
        title: 'Congratulations !',
        text: result.message,
        icon: 'success',
        showCloseButton: true,
        confirmButtonText: 'Close'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          handleClose()
          window.location.reload()
        }
      })
    } else {
      toast.error(result.message)
    }
  }

  const handleAddProduct = async (data: any) => {
    const reqConfig: ProductRequest = {
      name: data.productName,
      description: data.description,
      sku: data.sku,
      priceUnit: data.price,
      brandId: data.brand,
      quantity: data.quantity,
      categoryId: data.category,
      discount: data.discount
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify(reqConfig))
    for (var x = 0; x < data.imageUrls.length; x++) {
      formData.append('images', data.imageUrls[x])
    }
    setIsLoading(true)
    const result: responseType = await axiosClient.post(API_URL_PRODUCT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setIsLoading(false)

    if (result.status === 'OK') {
      Swal.fire({
        title: 'Congratulations !',
        text: result.message,
        icon: 'success',
        showCloseButton: true,
        confirmButtonText: 'Close'
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          handleClose()
          window.location.reload()
        }
      })
    } else {
      toast.error(result.message)
    }
  }

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>
        {varient === 'ADD' ? (
          <Button size='3' radius='full' className='w-full !cursor-pointer hover:bg-[#263E7B] bg-[#2f62ff3c] '>
            Add new product
            <PiPlusCircleBold />
          </Button>
        ) : (
          <Button
            variant='outline'
            color='indigo'
            radius='full'
            className='hover:cursor-pointer hover:bg-[#3E5093] hover:text-white col'
          >
            <FaPencil />
            Edit
          </Button>
        )}
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          {varient === 'ADD' ? 'Add product' : 'Edit product'}
        </DialogTitle>
        <DialogContent className='bg-[#171F29] '>
          <p className='text-primary'>Product Setting</p>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              varient === 'ADD' ? handleAddProduct(data) : handleEditProduct(data, dataProps)
              handleAddProduct(data)
            })}
          >
            <div className='gap-5'>
              <div>
                <TextH textProps='Product Name' />
                <Input
                  name='productName'
                  register={register}
                  type='text'
                  defaulValue={dataProps?.name}
                  placeholder='Enter product name...'
                />
              </div>
              <div>
                <TextH textProps='Description' />
                <textarea
                  id='message'
                  rows={4}
                  defaultValue={dataProps?.description}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Write description here...'
                  {...register('description')}
                ></textarea>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <TextH textProps='Brand Name' />
                  <Controller
                    name='brand'
                    control={control}
                    render={({ field }) => (
                      <ListBox field={field} data={brandsData} name='Brand' defaultValue={dataProps?.brand?.name} />
                    )}
                  />
                </div>
                <div className='w-full'>
                  <TextH textProps='Category Name' />
                  <Controller
                    name='category'
                    control={control}
                    render={({ field }) => (
                      <ListBox
                        field={field}
                        data={categoriesData}
                        name='Category'
                        defaultValue={dataProps?.category?.name}
                      />
                    )}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <TextH textProps='Regular Price' />
                  <Input
                    name='price'
                    register={register}
                    type='number'
                    defaulValue={dataProps?.priceUnit}
                    placeholder='Enter the price...'
                  />
                </div>
                <div className='w-full'>
                  <TextH textProps='Discount' />
                  <Input
                    name='discount'
                    register={register}
                    type='number'
                    defaulValue={dataProps?.discount}
                    placeholder='Enter the discount...'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <TextH textProps='SKU' />
                  <Input
                    name='sku'
                    register={register}
                    type='text'
                    defaulValue={dataProps?.sku}
                    placeholder='Enter the sku code...'
                  />
                </div>
                <div className='w-full'>
                  <TextH textProps='Quantity in Stock' />
                  <Input
                    name='quantity'
                    register={register}
                    type='number'
                    defaulValue={dataProps?.quantity}
                    placeholder='Enter the quantity...'
                  />
                </div>
              </div>
            </div>
            <div className='mt-4 '>
              <FileInputMutiple
                imageUrls={dataProps?.thumbnailUrls}
                register={register}
                variant={varient}
                name='imageUrls'
              />
            </div>
            <div className='mt-[25px] flex justify-end'>
              <div className='flex gap-4'>
                <CustomButton
                  className='bg-[#263E7B] !cursor-pointer text-primary hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
                  disabled={isLoading}
                >
                  Save
                </CustomButton>
                <Button
                  type='button'
                  onClick={handleClose}
                  className='bg-[#263E7B] !cursor-pointer text-primary hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none'
                >
                  Close
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default AddProductDialog
