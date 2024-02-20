import axiosClient from '@/axios/axiosClient'
import { API_URL_BRAND } from '@/constant/apiConstant'

interface paramsPops {
  searchText?: string | ''
  offset?: number
  pageSize?: number
  sortStr?: string | ''
}
const url = API_URL_BRAND
const brandApi = {
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

// export const getAllCategory = (searchText?: string | '', offset?: number, pageSize?: number, sortStr?: string | '') =>
//   http({
//     url: API_URL_CATEGORY,
//     method: 'get',
//     params: {
//       searchText,
//       offset,
//       pageSize,
//       sortStr
//     }
//   })

export default brandApi
