import axiosInstance from './axios'

export const getCurrentWeather = async (location) => {
  return await axiosInstance.get('/weather/current', { params: { location } })
}

export const getWeatherForecast = async (location, days = 7) => {
  return await axiosInstance.get('/weather/forecast', { params: { location, days } })
}

export const getWeatherHistory = async (location, startDate, endDate) => {
  return await axiosInstance.get('/weather/history', { params: { location, startDate, endDate } })
}

export const getWeatherAlerts = async (location) => {
  return await axiosInstance.get('/weather/alerts', { params: { location } })
}
