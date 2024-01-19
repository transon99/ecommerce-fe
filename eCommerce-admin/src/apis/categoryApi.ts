import axiosClient from '@/axios/axiosClient'
import { API_URL_CATEGORY } from '@/constant/apiConstant'

interface paramsPops {
  searchText?: string | ''
  offset?: number
  pageSize?: number
  sortStr?: string | ''
}
const url = API_URL_CATEGORY
const categoryApi = {
  getByConditionAndPagination: (params: paramsPops) => {
    return axiosClient.get(url, {
      params
    })
  },
  getAll: () => {
    return axiosClient.get(`${url}/all`)
  },
  getBaseCategory: () => {
    return axiosClient.get(`${url}/base-categories`)
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

export default categoryApi
