import axiosClient from '@/axios/axiosClient'
import { PREFIX_URL_AUTH } from '@/constant/apiConstant'

const url = PREFIX_URL_AUTH
const authApi = {
  login: (data: LoginResquest) => {
    return axiosClient.post(`${url}/login`, data)
  }
}

export default authApi
