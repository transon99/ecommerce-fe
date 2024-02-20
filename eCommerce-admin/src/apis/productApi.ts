import axiosClient from '@/axios/axiosClient'
import { API_URL_PRODUCT } from '@/constant/apiConstant'

interface paramsPops {
  categoryId?: string
  brandId?: string
  searchText?: string | ''
  offset?: number
  pageSize?: number
  sortStr?: string | ''
}
const url = API_URL_PRODUCT
const productApi = {
  getByConditionAndPagination: (params: paramsPops) => {
    return axiosClient.get(url, {
      params
    })
  },
  filterProduct: (params: paramsPops) => {
    return axiosClient.get(`${url}/filter`, {
      params
    })
  },
  getById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`)
  },
  delete: (id: string) => {
    return axiosClient.delete(`${url}/${id}`)
  }
}

export default productApi
