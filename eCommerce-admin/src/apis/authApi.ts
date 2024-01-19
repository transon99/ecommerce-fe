import axiosClient from '@/axios/axiosClient'
import { PREFIX_URL_AUTH } from '@/constant/apiConstant'

const authApi = {
  login: (data: LoginResquest) => {
    const url = `${PREFIX_URL_AUTH}/login`
    return axiosClient.post(url, data)
  }
}

export default authApi
