import axiosInstance from './axios'

export const login = async (credentials) => {
  return await axiosInstance.post('/auth/login', credentials)
}

export const register = async (userData) => {
  return await axiosInstance.post('/auth/register', userData)
}

export const logout = async () => {
  return await axiosInstance.post('/auth/logout')
}

export const getUserProfile = async () => {
  return await axiosInstance.get('/auth/profile')
}

export const updateProfile = async (profileData) => {
  return await axiosInstance.put('/auth/profile', profileData)
}

export const forgotPassword = async (email) => {
  return await axiosInstance.post('/auth/forgot-password', { email })
}

export const resetPassword = async (token, password) => {
  return await axiosInstance.post('/auth/reset-password', { token, password })
}
