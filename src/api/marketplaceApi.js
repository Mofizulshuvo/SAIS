import axiosInstance from './axios'

export const getProducts = async (params) => {
  return await axiosInstance.get('/marketplace/products', { params })
}

export const getProductDetails = async (productId) => {
  return await axiosInstance.get(`/marketplace/products/${productId}`)
}

export const addToCart = async (itemData) => {
  return await axiosInstance.post('/marketplace/cart', itemData)
}

export const getCart = async () => {
  return await axiosInstance.get('/marketplace/cart')
}

export const removeFromCart = async (itemId) => {
  return await axiosInstance.delete(`/marketplace/cart/${itemId}`)
}

export const updateCartItem = async (itemId, quantity) => {
  return await axiosInstance.put(`/marketplace/cart/${itemId}`, { quantity })
}

export const createOrder = async (orderData) => {
  return await axiosInstance.post('/marketplace/orders', orderData)
}

export const getOrders = async (params) => {
  return await axiosInstance.get('/marketplace/orders', { params })
}

export const getOrderDetails = async (orderId) => {
  return await axiosInstance.get(`/marketplace/orders/${orderId}`)
}

export const searchProducts = async (query, filters) => {
  return await axiosInstance.get('/marketplace/search', { params: { query, ...filters } })
}
