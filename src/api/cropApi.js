import axiosInstance from './axios'

export const getCropRecommendations = async (cropData) => {
  return await axiosInstance.post('/crop/recommend', cropData)
}

export const getCropDetails = async (cropId) => {
  return await axiosInstance.get(`/crop/${cropId}`)
}

export const getCropList = async (params) => {
  return await axiosInstance.get('/crop', { params })
}

export const getCropGrowingGuide = async (cropId) => {
  return await axiosInstance.get(`/crop/${cropId}/guide`)
}

export const getCropSeasonalInfo = async (cropId, season) => {
  return await axiosInstance.get(`/crop/${cropId}/season/${season}`)
}
