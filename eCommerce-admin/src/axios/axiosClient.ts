import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
  const access_token = JSON.parse(localStorage?.getItem('userStore') || '{}')?.state?.access_token
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  return config
})
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    console.log(error)
    // return error.response.data
  }
)
export default axiosClient
