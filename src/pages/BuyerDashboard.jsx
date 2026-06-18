import React from 'react'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiHeart, FiPackage, FiTrendingUp } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import { StatCard } from '../components/common/Card'
import Button from '../components/common/Button'

const BuyerDashboard = () => {
  const stats = [
    { title: 'Total Orders', value: '45', change: 15, icon: FiPackage, color: 'primary' },
    { title: 'Wishlist Items', value: '12', change: 8, icon: FiHeart, color: 'accent' },
    { title: 'Total Spent', value: '$8.5K', change: 22, icon: FiTrendingUp, color: 'success' },
    { title: 'Active Orders', value: '3', change: 0, icon: FiShoppingBag, color: 'secondary' },
  ]

  const recentOrders = [
    { id: 1, product: 'Organic Wheat', quantity: '500 kg', status: 'Delivered', date: '2024-01-15' },
    { id: 2, product: 'Fresh Corn', quantity: '200 kg', status: 'In Transit', date: '2024-01-18' },
    { id: 3, product: 'Rice Premium', quantity: '300 kg', status: 'Processing', date: '2024-01-20' },
  ]

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Buyer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button icon={FiShoppingBag} variant="outline">
                Browse Marketplace
              </Button>
              <Button icon={FiHeart} variant="outline">
                View Wishlist
              </Button>
              <Button icon={FiPackage} variant="outline">
                Track Orders
              </Button>
              <Button icon={FiTrendingUp} variant="outline">
                View Analytics
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Orders
            </h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {order.product}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {order.quantity} • {order.date}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : order.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recommended Products
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: 'Organic Tomatoes', price: '$2.50/kg', farmer: 'John Farm' },
              { name: 'Fresh Potatoes', price: '$1.80/kg', farmer: 'Green Valley' },
              { name: 'Quality Carrots', price: '$2.20/kg', farmer: 'Sunshine Farm' },
              { name: 'Organic Onions', price: '$1.90/kg', farmer: 'Harvest Fields' },
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400 mt-2">{product.price}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{product.farmer}</p>
                <Button size="sm" className="mt-3" fullWidth>
                  Add to Cart
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default BuyerDashboard
