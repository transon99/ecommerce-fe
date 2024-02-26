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
  updateOrder: (data: any, id: string | undefined) => {
    return axiosClient.put(`${url}/${id}`, data)
  },
  getAll: () => {
    return axiosClient.get(`${url}`)
  },
  getById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`)
  },
  delete: (id: string) => {
    return axiosClient.delete(`${url}/${id}`)
  }
}

export default orderApi
