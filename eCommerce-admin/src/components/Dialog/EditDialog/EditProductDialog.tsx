import { FaPencil } from 'react-icons/fa6'

import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import axiosClient from '@/axios/axiosClient'
import { API_URL_CATEGORY, API_URL_PRODUCT } from '@/constant/apiConstant'
import { Button } from '@radix-ui/themes'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import FileInputMutiple from '../../Input/FileInputMutiple'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { ImageType } from '../AddDialog/AddProductDialog'
import TextArea from '@/components/Input/TextArea'
import { rules } from '@/utils/rules'
import CustomSelect from '@/components/Input/CustomSelect '
import { imageOrders } from '@/utils/ImageOrder'
import SelectImageArea from '@/components/Input/SelectImageArea'
import productApi from '@/apis/productApi'

interface PropTypes {
  productId?: string
  brandOptions?: any[] | undefined
  categoryOptions?: any[] | undefined
}

const EditProductDialog = ({ productId, brandOptions, categoryOptions }: PropTypes) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<Product>()

  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setIsProductCreated] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getById(productId)
        console.log('data', response)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  console.log('product', product)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      productName: '',
      description: '',
      price: '',
      brand: '',
      quantity: '',
      category: '',
      discount: '',
      images: []
    }
  })

  useEffect(() => {
    setCustomValue('images', images)
  }, [images])

  useEffect(() => {
    setCustomValue('productName', product?.name)
    setCustomValue('description', product?.description)
    setCustomValue('price', product?.price)
    setCustomValue('discount', product?.discount)
    setCustomValue('quantity', product?.quantity)
    const valueCategorysOption = { value: product?.categoryDTO?.id, label: product?.categoryDTO?.name }
    setCustomValue('category', valueCategorysOption)
    const valueBrandsOption = { value: product?.brandDTO?.id, label: product?.brandDTO?.name }
    setCustomValue('brand', valueBrandsOption)
  }, [product])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated])

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value]
      }
      return [...prev, value]
    })
  }, [])

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const fileredImages = prev.filter((item) => item.imageOrder !== value.imageOrder)
        return fileredImages
      }
      return prev
    })
  }, [])

  const handleEditProduct = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.productName)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('quantity', data.quantity)
    formData.append('discount', data.discount)
    formData.append('categoryId', data.category.value)
    formData.append('brandId', data.brand.value)
    if (data?.images) {
      for (let x = 0; x < data?.images.length; x++) {
        if (data?.images[x]) {
          formData.append('files', data?.images[x]?.image)
        }
      }
    }
    console.log('Form data', [...formData])
    setIsLoading(true)
    const result: responseType = await axiosClient.put(`${API_URL_PRODUCT}/${productId}`, formData, {
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
    <Fragment>
      <div onClick={handleClickOpen}>
        <Button
          variant='outline'
          color='indigo'
          radius='full'
          className='hover:cursor-pointer hover:bg-[#3E5093] hover:text-white col'
        >
          <FaPencil />
          Edit
        </Button>
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          Add product
        </DialogTitle>
        <DialogContent className='bg-[#171F29] '>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              handleEditProduct(data)
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
                  errorMessage={errors.productName?.message?.toString()}
                  rules={rules.productName}
                  disabled={isLoading}
                />
              </div>
              <div>
                <TextArea
                  id='description'
                  register={register}
                  lable='Description'
                  placeholder='Write description here...'
                  disabled={isLoading}
                  errorMessage={errors.description?.message?.toString()}
                  // rules={rules?.description}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <Controller
                    name='category'
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <CustomSelect
                        field={field}
                        options={categoryOptions}
                        lable='Category'
                        errorMessage={errors.brand?.message?.toString()}
                      />
                    )}
                  />
                </div>
                <div className='w-full'>
                  <Controller
                    name='brand'
                    control={control}
                    rules={{ required: 'This field is required' }}
                    render={({ field }) => (
                      <CustomSelect
                        field={field}
                        options={brandOptions}
                        lable='Brand'
                        errorMessage={errors.category?.message?.toString()}
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
                    placeholder='Enter the price...'
                    lable='Regular Price'
                    errorMessage={errors.price?.message?.toString()}
                    rules={rules.price}
                    disabled={isLoading}
                  />
                </div>
                <div className='w-full'>
                  <Input
                    id='discount'
                    register={register}
                    type='number'
                    placeholder='Enter the discount...'
                    errorMessage={errors.discount?.message?.toString()}
                    lable='Discount'
                  />
                </div>
              </div>

              <div className='w-full'>
                <Input
                  id='quantity'
                  register={register}
                  type='number'
                  placeholder='Enter the quantity...'
                  errorMessage={errors.quantity?.message?.toString()}
                  rules={rules.quantity}
                  lable='Quantity in Stock'
                />
              </div>
            </div>
            <div className='mt-4 '>
              <label htmlFor='Select images' className='block mb-2 font-medium text-gray-900 dark:text-white'>
                Select images
              </label>
              <div className='grid grid-cols-2 gap-3 text-white text-sm'>
                {imageOrders.map((item, index) => {
                  return (
                    <SelectImageArea
                      key={index}
                      item={item}
                      addImageToState={addImageToState}
                      removeImageFromState={removeImageFromState}
                      isProductCreated={isProductCreated}
                    />
                  )
                })}
              </div>
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
    </Fragment>
  )
}

export default EditProductDialog
