import axiosInstance from './axios'

export const analyzeSoil = async (soilData) => {
  return await axiosInstance.post('/soil/analyze', soilData)
}

export const getSoilAnalysisHistory = async (params) => {
  return await axiosInstance.get('/soil/history', { params })
}

export const getSoilAnalysisDetails = async (analysisId) => {
  return await axiosInstance.get(`/soil/${analysisId}`)
}

export const getSoilRecommendations = async (analysisId) => {
  return await axiosInstance.get(`/soil/${analysisId}/recommendations`)
}
