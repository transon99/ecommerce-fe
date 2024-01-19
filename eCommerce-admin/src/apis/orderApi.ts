import axiosClient from '@/axios/axiosClient'
import { API_URL_ORDER } from '@/constant/apiConstant'

interface paramsPops {
  searchText?: string | ''
  offset?: number
  pageSize?: number
  sortStr?: string | ''
}
const url = API_URL_ORDER
const orderApi = {
  getByConditionAndPagination: (params: paramsPops) => {
    return axiosClient.get(url, {
      params
    })
  },
  getAll: () => {
    return axiosClient.get(`${url}/all`)
  },
  delete: (id: string) => {
    return axiosClient.delete(`${url}/${id}`)
  }
}

export default orderApi
