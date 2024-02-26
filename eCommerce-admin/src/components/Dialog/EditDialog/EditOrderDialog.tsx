import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import orderApi from '@/apis/orderApi'
import ActionBtn from '@/components/ActionBtn'
import CustomSelect from '@/components/Input/CustomSelect '
import { Button } from '@radix-ui/themes'
import { Fragment, useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { MdEdit } from 'react-icons/md'
import CustomButton from '../../common/CustomButton'
import '../index.css'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

interface EditOrderDialogProp {
  orderId?: string | undefined
}

interface UpdateOrderRequest {
  deliveryStatus: string | undefined
  status: string | undefined
}

const EditOrderDialog = ({ orderId }: EditOrderDialogProp) => {
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState<Order>()
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderApi.getById(orderId)
        setOrder(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  console.log('order', order)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      deliveryStatus: '',
      status: ''
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
    const valuedeliveryStatusOption = { value: order?.deliveryStatus, label: order?.deliveryStatus }
    setCustomValue('deliveryStatus', valuedeliveryStatusOption)
    const valueOrderStatusOption = { value: order?.status, label: order?.status }
    setCustomValue('status', valueOrderStatusOption)
  }, [order])

  const handleEditProduct = async (data: any) => {
    console.log('first', data)

    const updateOrderData: UpdateOrderRequest = {
      deliveryStatus: data.deliveryStatus.value,
      status: data.status.value
    }

    setIsLoading(true)
    const response = await orderApi.updateOrder(updateOrderData, orderId)
    console.log('response', response)
    setIsLoading(false)

    if (response.status === 'OK') {
      Swal.fire({
        title: 'Congratulations !',
        text: response.message,
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
      toast.error(response.message)
    }
  }

  const delivetyStatusOptions = [
    {
      value: 'PENDING',
      label: 'PENDING'
    },
    {
      value: 'DISPATCHED',
      label: 'DISPATCHED'
    },
    {
      value: 'DELIVERED',
      label: 'DELIVERED'
    }
  ]

  const orderStatusOptions = [
    {
      value: 'PENDING',
      label: 'PENDING'
    },
    {
      value: 'COMPLETED',
      label: 'COMPLETED'
    },
    {
      value: 'CANCELED',
      label: 'CANCELED'
    }
  ]
  return (
    <Fragment>
      <div onClick={handleClickOpen}>
        <ActionBtn icon={MdEdit} />
      </div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' className='bg-[#171F29] text-primary' style={{ fontWeight: 'bold' }}>
          Edit order
        </DialogTitle>
        <DialogContent className='bg-[#171F29] min-h-[300px]'>
          <form
            className=''
            onSubmit={handleSubmit((data) => {
              handleEditProduct(data)
            })}
          >
            <div className='flex gap-4'>
              <div className='w-full'>
                <Controller
                  name='deliveryStatus'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect field={field} options={delivetyStatusOptions} lable='Delivery Status' />
                  )}
                />
              </div>
              <div className='w-full'>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    <CustomSelect field={field} options={orderStatusOptions} lable='Order Status' />
                  )}
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

export default EditOrderDialog
