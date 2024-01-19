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

// class Http {
//   instance: AxiosInstance
//   constructor() {
//     this.instance = axios.create({
//       baseURL: import.meta.env.VITE_SERVER_URL,
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     // Add a request interceptor
//     this.instance.interceptors.request.use(async (config) => {
//       const access_token = JSON.parse(localStorage.getItem('userStore') || '{}').state.access_token
//       if (access_token) {
//         config.headers.Authorization = `Bearer ${access_token}`
//       }
//       return config
//     })

//     // Add response interceptor
//     this.instance.interceptors.response.use(
//       (response) => {
//         return response.data
//       },
//       (error) => {
//         console.log(error.response.data.message)
//         return error.response.data
//       }
//     )
//   }
// }

// const http = new Http().instance

// export default http
