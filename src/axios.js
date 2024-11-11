import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
  withCredentials: true // Include cookies with requests
})

export default axiosInstance
