import axiosInstance from './axios'

const normalizeLocationParams = (location, days) => {
  const source = typeof location === 'object' && location !== null ? location : { location }
  const params = {
    ...source,
    lat: source.lat ?? source.latitude,
    lon: source.lon ?? source.longitude,
  }

  if (days !== undefined) params.days = days
  delete params.latitude
  delete params.longitude
  return params
}

export const getCurrentWeather = async (location) => {
  return await axiosInstance.get('/weather/current', { params: normalizeLocationParams(location) })
}

export const getWeatherForecast = async (location, days = 7) => {
  return await axiosInstance.get('/weather/forecast', { params: normalizeLocationParams(location, days) })
}

export const getForecast = getWeatherForecast

export const getWeatherHistory = async (location, startDate, endDate) => {
  const params = typeof location === 'object' && location !== null
    ? location
    : { type: location, startDate, endDate }
  return await axiosInstance.get('/weather/history', { params })
}

export const getWeatherAlerts = async (location) => {
  return await axiosInstance.get('/weather/alerts', { params: { location } })
}
