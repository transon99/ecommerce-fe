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
import { Controller, FieldValues, useForm } from 'react-hook-form'
import FileInputMutiple from '../../Input/FileInputMutiple'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import TextArea from '@/components/Input/TextArea'

interface PropTypes {
  varient: string
  dataProps?: Product
  categoriesData?: Category[]
  brandsData?: Brand[]
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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FieldValues>({})

  const handleAddProduct = async (data: any) => {
    console.log(data)
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
          <hr className='bg-slate-300 w-full h-px' />
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              handleAddProduct(data)
            })}
          >
            <div className='flex flex-col gap-5'>
              <div>
                <Input
                  id='productName'
                  register={register}
                  type='text'
                  placeholder='Enter product name...'
                  lable='Product Name'
                  errors={errors}
                />
              </div>
              <div>
                {/* <textarea
                  id='message'
                  rows={4}
                  defaultValue={dataProps?.description}
                  className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Write description here...'
                  {...register('description')}
                ></textarea> */}
                <TextArea
                  id='description'
                  errors={errors}
                  register={register}
                  lable='Description'
                  disabled={isLoading}
                  value={dataProps?.description}
                  required
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <Controller
                    name='brand'
                    control={control}
                    render={({ field }) => (
                      <ListBox
                        field={field}
                        data={brandsData}
                        name='Brand'
                        value={dataProps?.brand?.name}
                        lable='Brand'
                      />
                    )}
                  />
                </div>
                <div className='w-full'>
                  <Controller
                    name='category'
                    control={control}
                    render={({ field }) => (
                      <ListBox
                        field={field}
                        data={categoriesData}
                        name='Category'
                        value={dataProps?.category?.name}
                        lable='Category'
                      />
                    )}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <Input
                    id='price'
                    register={register}
                    type='number'
                    value={dataProps?.priceUnit}
                    placeholder='Enter the price...'
                    errors={errors}
                    lable='Regular Price'
                  />
                </div>
                <div className='w-full'>
                  <Input
                    id='discount'
                    register={register}
                    type='number'
                    value={dataProps?.discount}
                    placeholder='Enter the discount...'
                    errors={errors}
                    lable='Discount'
                  />
                </div>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <Input
                    id='sku'
                    register={register}
                    type='text'
                    value={dataProps?.sku}
                    placeholder='Enter the sku code...'
                    errors={errors}
                    lable='SKU'
                  />
                </div>
                <div className='w-full'>
                  <Input
                    id='quantity'
                    register={register}
                    type='number'
                    value={dataProps?.quantity}
                    placeholder='Enter the quantity...'
                    errors={errors}
                    lable='Quantity in Stock'
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
