import axiosInstance from './axios'

export const getIrrigationRecommendation = async (irrigationData) => {
  return await axiosInstance.post('/irrigation/recommend', irrigationData)
}
