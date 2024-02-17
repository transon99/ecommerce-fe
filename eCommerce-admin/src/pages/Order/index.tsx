import orderApi from '@/apis/orderApi'
import { CardOrder } from '@/components'
import { EditOrderDialog } from '@/components/Dialog'
import NullData from '@/components/NullData'
import { DataTable } from '@/components/Table'
import { GridColDef } from '@mui/x-data-grid'
import { Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { FaCheckToSlot } from 'react-icons/fa6'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  {
    field: 'userId',
    headerName: 'UserID',
    width: 220
  },
  {
    field: 'paymentMethodId',
    type: 'string',
    headerName: 'Payment Method',
    width: 150
  },
  {
    field: 'status',
    type: 'string',
    headerName: 'Order Status',
    width: 200
  },
  {
    field: 'amount',
    headerName: 'Amount(USD)',
    width: 130,
    type: 'string'
  },
  {
    field: 'orderDate',
    headerName: 'Order Date',
    width: 200,
    type: 'string'
  }
]

const cardStatus: any[] = [
  { Icon: FaCheckToSlot, layble: 'Pending', quantity: 2322 },
  { Icon: FaCheckToSlot, layble: 'Confirmed', quantity: 2322 },
  { Icon: FaCheckToSlot, layble: 'Completed', quantity: 2322 },
  { Icon: FaCheckToSlot, layble: 'Canceled', quantity: 2322 }
]

const OrderPage = () => {
  const editOrder = (data: any) => <EditOrderDialog varient='EDIT' dataProps={data} />
  const [data, setData] = useState<Order[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderApi.getAll()
        console.log(response.data.data.content)
        setData(response.data.data.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='h-[calc(100vh-88px)] overflow-auto'>
      <div
        className='card no-hover flex flex-col gap-5 !p-5 md:!p-[26px] lg:!py-5 lg:flex-row
    lg:items-center lg:gap-4 '
      >
        <h1 className='text-white flex-1 text-center lg:text-left text-4xl font-bold bg-[#171F29] rounded-lg !p-5 md:!p-[26px] lg:!py-5'>
          Order Management
        </h1>
      </div>
      <div className='px-5'>
        <div>
          <Text weight={'medium'} size={'4'} className='text-primary'>
            Sort
          </Text>
          <div className='flex gap-2.5 sm:gap-[26px]'>
            {/* <ListBoxs />
            <ListBoxs /> */}
          </div>
        </div>
        <Flex className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4 gap-5'>
          {cardStatus.map((card) => (
            <CardOrder key={card.layble} Icon={card.Icon} layble={card.layble} quantity={card.quantity} />
          ))}
        </Flex>
        <div className='mt-5 rounded-xl'>
          {data.length === 0 ? (
            <NullData title="DON'T HAVE ANY ORDER YET" />
          ) : (
            <DataTable slug='orders' columns={columns} rows={data} editBtn={editOrder} />
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderPage
