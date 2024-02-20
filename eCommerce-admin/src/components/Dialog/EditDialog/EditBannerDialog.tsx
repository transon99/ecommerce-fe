import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { PiPlusCircleBold } from 'react-icons/pi'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import axiosClient from '@/axios/axiosClient'
import { API_URL_BANNER, API_URL_CATEGORY } from '@/constant/apiConstant'
import { Button } from '@radix-ui/themes'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md'
import ActionBtn from '../../ActionBtn'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import { ImageType } from '../AddDialog/AddProductDialog'
import bannerApi from '@/apis/bannerApi'
import SelectImageArea from '@/components/Input/SelectImageArea'
import { rules } from '@/utils/rules'

interface PropTypes {
  bannerId?: string
}

const EditBannerDialog = ({ bannerId }: PropTypes) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [banner, setBanner] = useState<Banner>()
  const [images, setImages] = useState<ImageType[] | null>()
  const [isProductCreated, setIsProductCreated] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bannerApi.getById(bannerId)
        console.log('data', response)
        setBanner(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  console.log('banner dialog', banner)

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
    setCustomValue('bannerName', banner?.name)
  }, [banner])

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
  const handleEditBanner = async (data: any) => {
    const formData = new FormData()
    formData.append('name', data.bannerName)
    if (data?.images) {
      formData.append('file', data?.images[0]?.image)
    }
    console.log('Form data', [...formData])
    setIsLoading(true)
    const result: responseType = await axiosClient.put(`${API_URL_BANNER}/${bannerId}`, formData, {
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
          Edit Banner
        </DialogTitle>
        <DialogContent className='bg-[#171F29] min-w-[400px]'>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              handleEditBanner(data)
            })}
          >
            <div className='gap-5 flex justify-between'>
              <div className='w-full'>
                <Input
                  id='bannerName'
                  register={register}
                  type='text'
                  errorMessage={errors.bannerName?.message?.toString()}
                  rules={rules.bannerName}
                  lable='Banner Name'
                  disabled={isLoading}
                  placeholder='Enter categry name...'
                />
              </div>
            </div>
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

export default EditBannerDialog
