import axiosInstance from './axios'

export const detectDisease = async (imageData) => {
  const formData = new FormData()
  formData.append('image', imageData)
  return await axiosInstance.post('/disease/detect', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const getDiseaseHistory = async (params) => {
  return await axiosInstance.get('/disease/history', { params })
}

export const getDiseaseDetails = async (diseaseId) => {
  return await axiosInstance.get(`/disease/${diseaseId}`)
}

export const getTreatmentRecommendation = async (diseaseId) => {
  return await axiosInstance.get(`/disease/${diseaseId}/treatment`)
}
