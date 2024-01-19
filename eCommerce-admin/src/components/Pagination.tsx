import { Pagination, PaginationItem, Stack } from '@mui/material'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type Props = {
  count: number
  page: number
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void
}

const PaginationComponent = ({ count, handleChange, page }: Props) => {
  return <Pagination color='primary' count={count} page={page} onChange={handleChange} />
}

export default PaginationComponent
