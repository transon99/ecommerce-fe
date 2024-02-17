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
import FileInput from '../../Input/FileInputSingle'
import { Input } from '../../Input/Input'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import ActionBtn from '../../ActionBtn'
import { MdEdit } from 'react-icons/md'

interface PropTypes {
  varient: string
  dataProps?: User
}

interface InputProps {
  textProps: string
}

const TextH = ({ textProps }: InputProps) => {
  return <p className='text-primary my-2'>{textProps}</p>
}

const EditUserDialog = ({ varient, dataProps }: PropTypes) => {
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

  const handleEditProduct = async (data: any, dataProps: User | undefined) => {
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

  return (
    <React.Fragment>
      <div onClick={handleClickOpen}>
        <ActionBtn icon={MdEdit} />
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
              handleEditProduct(data, dataProps)
            })}
          >
            <div className='gap-5'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                  <TextH textProps='First Name' />
                  <Input
                    name='firstName'
                    register={register}
                    type='text'
                    value={dataProps?.firstName}
                    placeholder='Enter first name...'
                  />
                </div>
                <div className='w-full'>
                  <TextH textProps='Last Name' />
                  <Input
                    name='lastName'
                    register={register}
                    type='text'
                    value={dataProps?.lastName}
                    placeholder='Enter lastName...'
                  />
                </div>
              </div>

              <div>
                <TextH textProps='Email' />
                <Input
                  name='email'
                  register={register}
                  type='text'
                  value={dataProps?.email}
                  placeholder='Enter email...'
                />
              </div>

              <div>
                <TextH textProps='Phone' />
                <Input
                  name='phone'
                  register={register}
                  type='text'
                  value={dataProps?.phone}
                  placeholder='Enter phone number...'
                />
              </div>

              <div>
                <TextH textProps='Address' />
                <Input
                  name='address'
                  register={register}
                  type='text'
                  value={dataProps?.addresses}
                  placeholder='Enter email...'
                />
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
              <FileInput register={register} variant={varient} name='imageUrls' />
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

export default EditUserDialog
