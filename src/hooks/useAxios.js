import { useState, useCallback } from 'react'
import axiosInstance from '../api/axios'

export const useAxios = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (config) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance(config)
      setLoading(false)
      return response.data
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.message || err.message || 'An error occurred')
      throw err
    }
  }, [])

  const get = useCallback((url, config) => request({ ...config, method: 'GET', url }), [request])
  const post = useCallback((url, data, config) => request({ ...config, method: 'POST', url, data }), [request])
  const put = useCallback((url, data, config) => request({ ...config, method: 'PUT', url, data }), [request])
  const patch = useCallback((url, data, config) => request({ ...config, method: 'PATCH', url, data }), [request])
  const del = useCallback((url, config) => request({ ...config, method: 'DELETE', url }), [request])

  return { loading, error, request, get, post, put, patch, delete: del }
}
