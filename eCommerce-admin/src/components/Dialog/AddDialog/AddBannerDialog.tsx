import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { PiPlusCircleBold } from 'react-icons/pi'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import axiosClient from '@/axios/axiosClient'
import { Button } from '@radix-ui/themes'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import { ImageType } from './AddProductDialog'
import { API_URL_BANNER } from '@/constant/apiConstant'
import { rules } from '@/utils/rules'
import SelectImageArea from '@/components/Input/SelectImageArea'

const AddBannerDiaglog = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setIsProductCreated] = useState(false)
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
    setValue,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      bannerName: '',
      images: []
    }
  })

  useEffect(() => {
    setCustomValue('images', images)
  }, [images])

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

  const handleAddBanner = async (data: any) => {
    console.log('data: ', data)
    const formData = new FormData()
    formData.append('name', data.bannerName)

    if (data?.images) {
      formData.append('file', data?.images[0]?.image)
    }

    setIsLoading(true)
    console.log('data1: ', [...formData])

    const result: responseType = await axiosClient.post(API_URL_BANNER, formData, {
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
        <Button size='3' radius='full' className='w-full !cursor-pointer hover:bg-[#263E7B] bg-[#2f62ff3c] '>
          Add new Banner
          <PiPlusCircleBold />
        </Button>
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          Add Banner
        </DialogTitle>
        <DialogContent className='bg-[#171F29] min-w-[400px]'>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              handleAddBanner(data)
            })}
          >
            <div className='gap-5 flex justify-between'>
              <div className='w-full'>
                <Input
                  id='bannerName'
                  register={register}
                  type='text'
                  placeholder='Enter banner name...'
                  lable='Banner Name'
                  errorMessage={errors.brandName?.message?.toString()}
                  rules={rules.bannerName}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div>
              <label htmlFor='Select images' className='block mb-2 font-medium text-gray-900 dark:text-white'>
                Select images
              </label>
              <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 text-white'>
                <SelectImageArea
                  item={{ imageOrder: 'Banner ', image: null }}
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

export default AddBannerDiaglog
