import axiosInstance from './axios'

export const sendMessage = async (message) => {
  return await axiosInstance.post('/chatbot/', { message })
}

export const getChatHistory = async () => {
  return await axiosInstance.get('/chatbot/history')
}
