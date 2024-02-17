import bannerApi from '@/apis/bannerApi'
import NullData from '@/components/NullData'
import { AddBannerDialog } from '@/components/Dialog'
import { DataTable } from '@/components/Table'
import { GridColDef } from '@mui/x-data-grid'
import { Flex, Text } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Name', width: 200 },
  {
    field: 'imageUrl',
    headerName: 'Image',
    width: 420,
    renderCell: (param) => {
      return (
        <div className='w-16 h-9 rounded-lg overflow-hidden'>
          <img key={param.row.imageUrl} src={param.row.imageUrl} />
        </div>
      )
    }
  }
]

const Banner = () => {
  const editBanner = (data: any) => <AddBannerDialog varient='EDIT' dataProps={data} />

  const [data, setData] = useState<Banner[]>([])
  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const param = {
          searchText: '',
          offset: 0,
          pageSize: 5,
          sortStr: ''
        }
        const response = await bannerApi.getByConditionAndPagination(param)
        console.log(response.data.data.content)
        setData(response.data.data.content)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className='h-[calc(100vh-88px)] overflow-auto'>
        <div className='overflow-hidden'>
          <div
            className='card no-hover flex flex-col gap-5 !p-5 md:!p-[26px] lg:!py-5 lg:flex-row
lg:items-center lg:gap-4 '
          >
            <h1 className='text-primary flex-1 text-center lg:text-left text-4xl font-bold bg-[#171F29] rounded-lg !p-5 md:!p-[26px] lg:!py-5'>
              Banner Management
            </h1>
          </div>
          <div className='flex flex-col-reverse gap-4  md:flex-col lg:flex-row lg:justify-between p-5 pt-0'>
            <Flex direction={'column'} gap={'3'}>
              <AddBannerDialog varient='ADD' />
            </Flex>
          </div>
          <div className='flex flex-col flex-1 p-5 text-primary'>
            <div className='flex flex-wrap gap-2 mb-4 items-center justify-between'>
              <Text>
                Category:{' '}
                <Text weight={'bold'}>
                  All <Text weight={'light'}>({data ? data.length : 0})</Text>
                </Text>
              </Text>
              <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                {/* <ListBoxs /> */}
              </div>
            </div>
            <div className='mt-5 rounded-xl'>
              {data.length === 0 ? (
                <NullData title="DON'T HAVE ANY BANNER YET" />
              ) : (
                <DataTable slug='branners' columns={columns} rows={data} editBtn={editBanner} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Banner
