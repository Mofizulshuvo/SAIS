import axiosInstance from './axios'

export const getAdminStats = async () => {
  return await axiosInstance.get('/admin/stats')
}

export const getAdminUsers = async () => {
  return await axiosInstance.get('/admin/users')
}

export const getAdminOrders = async () => {
  return await axiosInstance.get('/admin/orders')
}
