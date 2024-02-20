import { useState, useEffect } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { AddCategoryDialog } from '@/components/Dialog'
import categoryApi from '@/apis/categoryApi'
import { GridColDef } from '@mui/x-data-grid'
import DataTable from '@/components/Table/DataTable'
import NullData from '@/components/NullData'
import EditCategoryDialog from '@/components/Dialog/EditDialog/EditCategoryDialog'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 220 },
  { field: 'name', headerName: 'Name', width: 220 },
  {
    field: 'baseCategory',
    headerName: 'Base Category',
    width: 220,
    renderCell: (param) => {
      return <p>{param.row?.parent?.name}</p>
    }
  },
  {
    field: 'imageUrl',
    headerName: 'Image',
    width: 120,
    renderCell: (param) => {
      return (
        <div className='w-10 h-10 rounded-lg object-cover'>
          {param.row.imageUrls?.map((imageUrl: any) => <img key={imageUrl.id} src={imageUrl.thumbnailUrl} />)}
        </div>
      )
    }
  },
  {
    field: 'iconUrl',
    headerName: 'Icon',
    width: 120,
    renderCell: (param) => {
      return (
        <div className='w-10 h-10 rounded-lg overflow-hidden'>
          <img key={param.row.iconUrl?.id} src={param.row.iconUrl?.thumbnailUrl} />
        </div>
      )
    }
  }
]

const CategoryPage = () => {
  const [data, setData] = useState<Category[]>([])
  const [baseCategorysOptions, setBaseCategorysOptions] = useState<any[]>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getBaseCategory()
        const baseCategorysOptions = response.data?.map((baseCategory: Category) => ({
          value: baseCategory.id,
          label: baseCategory.name
        }))
        setBaseCategorysOptions(baseCategorysOptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await categoryApi.getAll()
        console.log(response)
        setData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const editCategory = (id: string) => <EditCategoryDialog categoryId={id} baseCategoryOptions={baseCategorysOptions} />

  return (
    <div className='h-[calc(100vh-88px)] overflow-auto'>
      <div
        className='card no-hover flex flex-col gap-5 !p-5 md:!p-[26px] lg:!py-5 lg:flex-row
    lg:items-center lg:gap-4 '
      >
        <h1 className='text-primary flex-1 text-center lg:text-left text-4xl font-bold bg-[#171F29] rounded-lg !p-5 md:!p-[26px] lg:!py-5'>
          Category Management
        </h1>
      </div>
      <div className='flex flex-col-reverse gap-4  md:flex-col lg:flex-row lg:justify-between p-5 pt-0'>
        <Flex direction={'column'} gap={'3'}>
          <AddCategoryDialog baseCategoryOptions={baseCategorysOptions} />
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
        </div>
        <div className='mt-5 rounded-xl'>
          {data.length === 0 ? (
            <NullData title="DON'T HAVE ANY CATEGORY YET" />
          ) : (
            <DataTable slug='category' columns={columns} rows={data} editBtn={editCategory} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
