import DataTable from '@/components/Table/DataTable'
import { GridColDef } from '@mui/x-data-grid'
import { Text } from '@radix-ui/themes'
import EditUserDialog from '@/components/Dialog/EditDialog/EditUserDialog'
import { useEffect, useState } from 'react'
import userApi from '@/apis/userApi'
import avatar from '@/assets/image/avatar/avatar-trang-4.jpg'
import NullData from '@/components/NullData'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'img',
    headerName: 'Avatar',
    width: 100,
    renderCell: (params) => {
      return <img className='rounded-full w-10 h-10 overflow-hidden' src={params.row.img || avatar} alt='' />
    }
  },
  {
    field: 'firstName',
    type: 'string',
    headerName: 'First name',
    width: 150
  },
  {
    field: 'lastName',
    type: 'string',
    headerName: 'Last name',
    width: 150
  },
  {
    field: 'email',
    type: 'string',
    headerName: 'Email',
    width: 200
  },
  {
    field: 'phone',
    type: 'string',
    headerName: 'Phone',
    width: 120
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
    type: 'string'
  },
  {
    field: 'enabled',
    headerName: 'Enabled',
    width: 100,
    type: 'boolean'
  },
  {
    field: 'blocked',
    headerName: 'Blocked',
    width: 100,
    type: 'boolean'
  }
]

const UserPage = () => {
  const [data, setData] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userApi.getAll()
        console.log(response.data)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  const editUser = (data: any) => <EditUserDialog varient='EDIT' dataProps={data} />
  return (
    <div className='h-[calc(100vh-88px)] overflow-auto'>
      <div
        className='card no-hover flex flex-col gap-5 !p-5 md:!p-[26px] lg:!py-5 lg:flex-row
    lg:items-center lg:gap-4 '
      >
        <h1 className='text-primary flex-1 text-center lg:text-left text-4xl font-bold bg-[#171F29] rounded-lg !p-5 md:!p-[26px] lg:!py-5'>
          User Management
        </h1>
      </div>
      <div className='flex flex-col flex-1 p-5 text-primary'>
        <div className='flex flex-wrap gap-2 mb-4 items-center justify-between'>
          <Text>
            User:{' '}
            <Text weight={'bold'}>
              All <Text weight={'light'}>({data ? data.length : 0})</Text>
            </Text>
          </Text>
        </div>
        <div className='mt-5 rounded-xl'>
          {data.length === 0 ? (
            <NullData title="DON'T HAVE ANY CATEGORY YET" />
          ) : (
            <DataTable slug='users' columns={columns} rows={data} editBtn={editUser} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UserPage
