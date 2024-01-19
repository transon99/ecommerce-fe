import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import './DataTable.scss'
import ActionBtn from '../ActionBtn'
import { MdDelete } from 'react-icons/md'
import { BANNER, BRAND, CATEGORY } from '@/constant/commonConstant'
import brandApi from '@/apis/brandApi'
import bannerApi from '@/apis/bannerApi'
import categoryApi from '@/apis/categoryApi'
import { ReactNode } from 'react'

type Props = {
  columns: GridColDef[]
  rows: object[]
  slug: string
  editBtn: (data: any) => ReactNode
}

const DataTable = (props: Props) => {
  const { editBtn } = props

  const handleDelete = (id: string) => {
    switch (props.slug) {
      case BRAND:
        brandApi.delete(id)
        break

      case BANNER:
        bannerApi.delete(id)
        break

      case CATEGORY:
        categoryApi.delete(id)
        break
      default:
        console.log('invalid value')
    }
    window.location.reload()
  }

  const actionColumn: GridColDef = {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (param) => {
      return (
        <div className='flex justify-between gap-4 w-full'>
          {editBtn(param.row)}
          <ActionBtn icon={MdDelete} onClick={() => handleDelete(param.row.id)} />
        </div>
      )
    }
  }

  return (
    <div>
      <DataGrid
        className='bg-white p-5'
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  )
}

export default DataTable
