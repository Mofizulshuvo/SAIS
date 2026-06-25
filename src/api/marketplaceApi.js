import axiosInstance from './axios'

export const getProducts = async (params) => {
  return await axiosInstance.get('/marketplace/products', { params })
}

export const getProductDetails = async (productId) => {
  return await axiosInstance.get(`/marketplace/products/${productId}`)
}

export const createProduct = async (productData) => {
  return await axiosInstance.post('/marketplace/products', productData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const updateProduct = async (productId, productData) => {
  return await axiosInstance.put(`/marketplace/products/${productId}`, productData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const deleteProduct = async (productId) => {
  return await axiosInstance.delete(`/marketplace/products/${productId}`)
}

export const createOrder = async (orderData) => {
  return await axiosInstance.post('/marketplace/orders', orderData)
}

export const getOrders = async () => {
  return await axiosInstance.get('/marketplace/orders')
}

export const getOrderDetails = async (orderId) => {
  return await axiosInstance.get(`/marketplace/orders/${orderId}`)
}
