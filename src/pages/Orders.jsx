import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPackage, FiSearch, FiFilter, FiEye } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { formatCurrency } from '../utils/helpers'
import { getOrders } from '../api/marketplaceApi'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await getOrders()
      if (response.data.success) {
        setOrders(response.data.data.orders || [])
      }
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const statusColors = {
    Processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    Shipped: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    Delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
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
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search orders..."
                icon={FiSearch}
              />
            </div>
            <Button variant="outline" icon={FiFilter}>
              Filter Orders
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading orders...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order._id || order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FiPackage className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            Order #{order._id || order.id}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'} • {order.items?.length || 0} items
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatCurrency(order.totalAmount || order.total)}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status] || statusColors.Processing}`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>
                        <Button size="sm" variant="outline" icon={FiEye}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start shopping to see your orders here
              </p>
              <Button icon={FiPackage}>
                Browse Marketplace
              </Button>
            </div>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  )
}

export default Orders
