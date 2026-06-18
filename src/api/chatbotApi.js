import axiosInstance from './axios'

export const sendMessage = async (message) => {
  return await axiosInstance.post('/chatbot/message', { message })
}

export const getChatHistory = async (params) => {
  return await axiosInstance.get('/chatbot/history', { params })
}

export const clearChatHistory = async () => {
  return await axiosInstance.delete('/chatbot/history')
}

export const getChatSuggestions = async () => {
  return await axiosInstance.get('/chatbot/suggestions')
}
