// import { Button, Flex } from '@radix-ui/themes'
import { PiPlusCircleBold } from 'react-icons/pi'
// import * as Dialog from '@radix-ui/react-dialog'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import * as React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { API_URL_BRAND, API_URL_CATEGORY } from '@/constant/apiConstant'
import { Button } from '@radix-ui/themes'
import { FieldValues, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md'
import ActionBtn from '../../ActionBtn'
import FileInput from '../../Input/FileInputSingle'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import axiosClient from '@/axios/axiosClient'

interface PropTypes {
  varient: string
  dataProps?: Brand
}

interface InputProps {
  textProps: string
}

const TextH = ({ textProps }: InputProps) => {
  return <p className='text-primary my-2'>{textProps}</p>
}

const EditBrandDialog = ({ varient, dataProps }: PropTypes) => {
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
    formState: { errors }
  } = useForm<FieldValues>({})

  const handleEditBrand = async (data: any, dataProps: Brand | undefined) => {
    console.log('dataPro', dataProps)
    console.log('data:', data)
    const reqConfig: BrandRequest = {
      name: data.name
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify(reqConfig))
    formData.append('image', data.imageUrl[0])
    console.log('Form data', [...formData])
    setIsLoading(true)
    const result: responseType = await axiosClient.put(`${API_URL_BRAND}/${dataProps?.id}`, formData, {
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

  const handleAddBrand = async (data: any) => {
    const reqConfig: BrandRequest = {
      name: data.name
    }
    const formData = new FormData()
    formData.append('data', JSON.stringify(reqConfig))
    formData.append('image', data.imageUrl[0])
    setIsLoading(true)
    const result: responseType = await axiosClient.post(API_URL_BRAND, formData, {
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
            Add new Brand
            <PiPlusCircleBold />
          </Button>
        ) : (
          <ActionBtn icon={MdEdit} />
        )}
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          {varient === 'ADD' ? 'Add Brand' : 'Edit Brand'}
        </DialogTitle>
        <DialogContent className='bg-[#171F29] '>
          <p className='text-primary'>Brand Setting</p>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              varient === 'ADD' ? handleAddBrand(data) : handleEditBrand(data, dataProps)
            })}
          >
            <div className='gap-5 flex justify-between'>
              <div className='w-full'>
                <TextH textProps='Brand Name' />
                <Input
                  id='brandName'
                  register={register}
                  type='text'
                  value={dataProps?.name}
                  errors={errors}
                  lable='Brand Name'
                  disabled={isLoading}
                  required
                  placeholder='Enter categry name...'
                />
              </div>
            </div>
            <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <FileInput imageUrl={dataProps?.imageUrls} variant={varient} register={register} name='imageUrl' />
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

export default EditBrandDialog
