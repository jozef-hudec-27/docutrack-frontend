import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const axiosOptions = {
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
}

const axiosInstance = axios.create(axiosOptions)

const api = (sendAuthorization = false) => {
  if (sendAuthorization) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth-token')}`
  } else {
    delete axiosInstance.defaults.headers.common['Authorization']
  }

  return axiosInstance
}

export default api
