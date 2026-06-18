import axiosInstance from './axios'

export const calculateIrrigation = async (irrigationData) => {
  return await axiosInstance.post('/irrigation/calculate', irrigationData)
}

export const getIrrigationSchedule = async (params) => {
  return await axiosInstance.get('/irrigation/schedule', { params })
}

export const getIrrigationHistory = async (params) => {
  return await axiosInstance.get('/irrigation/history', { params })
}

export const updateIrrigationSchedule = async (scheduleId, scheduleData) => {
  return await axiosInstance.put(`/irrigation/schedule/${scheduleId}`, scheduleData)
}

export const getWaterUsage = async (params) => {
  return await axiosInstance.get('/irrigation/usage', { params })
}
