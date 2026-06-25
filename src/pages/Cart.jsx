import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { formatCurrency } from '../utils/helpers'
import { createOrder } from '../api/marketplaceApi'
import toast from 'react-hot-toast'

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const updateCart = (items) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const updateQuantity = (id, delta) => {
    const updatedItems = cartItems.map(item => {
      if (item._id === id) {
        const newQuantity = Math.max(1, item.quantity + delta)
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    updateCart(updatedItems)
  }

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item._id !== id)
    updateCart(updatedItems)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15.00
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: total,
        shippingAddress: 'User default address',
      }

      const response = await createOrder(orderData)
      if (response.data.success) {
        toast.success('Order placed successfully!')
        localStorage.removeItem('cart')
        setCartItems([])
        navigate('/orders')
      } else {
        toast.error(response.data.message || 'Failed to place order')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Review your items before checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <FiShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Add some products to get started
              </p>
              <Button icon={FiShoppingBag}>
                Browse Marketplace
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card>
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                        ) : (
                          <div className="text-5xl">🌾</div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {item.description || 'Quality product'}
                          </p>
                          <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {formatCurrency(item.price)}/{item.unit || 'unit'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" icon={FiMinus} onClick={() => updateQuantity(item._id, -1)} />
                          <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <Button size="sm" variant="outline" icon={FiPlus} onClick={() => updateQuantity(item._id, 1)} />
                        </div>
                        <Button size="sm" variant="ghost" icon={FiTrash2} className="text-red-600" onClick={() => removeItem(item._id)} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Tax (8%)</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" fullWidth icon={FiShoppingBag} loading={loading} onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                    Free shipping on orders over $100
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}

export default Cart
