import axiosClient from '@/axios/axiosClient'
import { API_URL_BANNER } from '@/constant/apiConstant'

interface paramsPops {
  searchText?: string | ''
  offset?: number
  pageSize?: number
  sortStr?: string | ''
}
const url = API_URL_BANNER
const bannerApi = {
  getByConditionAndPagination: (params: paramsPops) => {
    return axiosClient.get(url, {
      params
    })
  },
  getAll: () => {
    return axiosClient.get(`${url}/all`)
  },
  getById: (id: string | undefined) => {
    return axiosClient.get(`${url}/${id}`)
  },
  delete: (id: string) => {
    return axiosClient.delete(`${url}/${id}`)
  }
}

export default bannerApi
