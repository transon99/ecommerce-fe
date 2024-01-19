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
import { Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md'
import ActionBtn from '../ActionBtn'
import FileInput from '../Input/FileInputSingle'
import { Input } from '../Input/Input'
import CustomButton from '../common/CustomButton'
import './index.css'
import FileInputMutiple from '../Input/FileInputMutiple'

interface PropTypes {
  varient: string
  dataProps?: Category
}

interface InputProps {
  textProps: string
}

const TextH = ({ textProps }: InputProps) => {
  return <p className='text-primary my-2'>{textProps}</p>
}

const AddBannerDiaglog = ({ varient, dataProps }: PropTypes) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { register, handleSubmit } = useForm()

  const handleEditBanner = async (data: any, dataProps: Category | undefined) => {
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

  const handleAddBanner = async (data: any) => {
    const reqConfig: CategoryRequest = {
      name: data.name
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify(reqConfig))
    formData.append('image', data.imageUrl[0])
    setIsLoading(true)
    console.log('first', [...formData])
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
        {varient === 'ADD' ? (
          <Button size='3' radius='full' className='w-full !cursor-pointer hover:bg-[#263E7B] bg-[#2f62ff3c] '>
            Add new banner
            <PiPlusCircleBold />
          </Button>
        ) : (
          <ActionBtn icon={MdEdit} />
        )}
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          {varient === 'ADD' ? 'Add Banner' : 'Edit Banner'}
        </DialogTitle>
        <DialogContent className='bg-[#171F29] '>
          <p className='text-primary'>Banner Setting</p>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              varient === 'ADD' ? handleAddBanner(data) : handleEditBanner(data, dataProps)
            })}
          >
            <div className='gap-5 flex justify-between'>
              <div className='w-full'>
                <TextH textProps='Banner Name' />
                <Input
                  name='name'
                  register={register}
                  type='text'
                  defaulValue={dataProps?.name}
                  placeholder='Enter banner name...'
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FileInputMutiple
                imageUrls={dataProps?.imageUrls}
                variant={varient}
                register={register}
                name='imageUrl'
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

export default AddBannerDiaglog
