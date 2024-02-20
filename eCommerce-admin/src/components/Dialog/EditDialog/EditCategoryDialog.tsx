import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import categoryApi from '@/apis/categoryApi'
import axiosClient from '@/axios/axiosClient'
import CustomSelect from '@/components/Input/CustomSelect '
import SelectImageArea from '@/components/Input/SelectImageArea'
import { API_URL_CATEGORY } from '@/constant/apiConstant'
import { rules } from '@/utils/rules'
import { Button } from '@radix-ui/themes'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md'
import ActionBtn from '../../ActionBtn'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import { ImageType } from '../AddDialog/AddProductDialog'
import '../index.css'

interface PropTypes {
  categoryId?: string
  baseCategoryOptions: any[] | undefined
}

const EditCategoryDialog = ({ categoryId, baseCategoryOptions }: PropTypes) => {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<CategoryResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setIsProductCreated] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getById(categoryId)
        setCategory(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

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
      name: '',
      baseCategories: '',
      images: []
    }
  })
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    setCustomValue('images', images)
  }, [images])

  useEffect(() => {
    setCustomValue('categoryName', category?.name)
    const valueBaseCategorysOption = { value: category?.parent?.id, label: category?.parent?.name }
    setCustomValue('baseCategories', valueBaseCategorysOption)
  }, [category])

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setImages(null)
      setIsProductCreated(false)
    }
  }, [isProductCreated])

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

  const handleEditCategory = async (data: any) => {
    console.log('data: ', data)

    const formData = new FormData()
    formData.append('name', data.categoryName)
    formData.append('parentCatId', data?.baseCategories.value ? data?.baseCategories.value : '')

    if (data?.images && data?.images[0]) {
      formData.append('imageFile', data?.images[0]?.image)
    }
    if (data?.images && data?.images[1]) {
      formData.append('iconFile', data?.images[1]?.image)
    }

    console.log('data1: ', [...formData])
    setIsLoading(true)
    const result: responseType = await axiosClient.put(`${API_URL_CATEGORY}/${categoryId}`, formData, {
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
        <ActionBtn icon={MdEdit} />
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          Edit Category
        </DialogTitle>
        <DialogContent className='bg-[#171F29] '>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              handleEditCategory(data)
            })}
          >
            <div className='gap-5 flex justify-between'>
              <div className='w-full'>
                <Input
                  id='categoryName'
                  register={register}
                  type='text'
                  placeholder='Enter categry name...'
                  lable='Category Name'
                  errorMessage={errors.categoryName?.message?.toString()}
                  rules={rules.categoryName}
                  disabled={isLoading}
                />
              </div>

              <div className='w-full'>
                <Controller
                  name='baseCategories'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect field={field} options={baseCategoryOptions} lable='Base Category' />
                  )}
                />
              </div>
            </div>
            <div className='mt-4 '>
              <label htmlFor='Select images' className='block mb-2 font-medium text-gray-900 dark:text-white'>
                Select images
              </label>
              <div className='grid grid-cols-2 gap-3 text-white text-sm'>
                <SelectImageArea
                  item={{ imageOrder: 'Category ', image: null }}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
                <SelectImageArea
                  item={{ imageOrder: 'Icon', image: null }}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
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

export default EditCategoryDialog
