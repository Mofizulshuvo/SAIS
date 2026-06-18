import React from 'react'
import { motion } from 'framer-motion'
import { FiActivity, FiDroplet, FiSun, FiShoppingBag, FiTrendingUp, FiAlertCircle } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import { StatCard } from '../components/common/Card'
import Button from '../components/common/Button'

const FarmerDashboard = () => {
  const stats = [
    { title: 'Total Crops', value: '24', change: 12, icon: FiActivity, color: 'primary' },
    { title: 'Disease Alerts', value: '3', change: -25, icon: FiAlertCircle, color: 'danger' },
    { title: 'Soil Health', value: '85%', change: 5, icon: FiDroplet, color: 'success' },
    { title: 'Market Value', value: '$12.5K', change: 8, icon: FiTrendingUp, color: 'accent' },
  ]

  const recentActivities = [
    { id: 1, type: 'disease', message: 'Wheat leaf rust detected in Field A', time: '2 hours ago', status: 'critical' },
    { id: 2, type: 'irrigation', message: 'Irrigation scheduled for tomorrow', time: '5 hours ago', status: 'info' },
    { id: 3, type: 'weather', message: 'Rain expected in 3 days', time: '1 day ago', status: 'warning' },
    { id: 4, type: 'market', message: 'New order received for corn', time: '2 days ago', status: 'success' },
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
            Farmer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's an overview of your farm.
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
              <Button icon={FiActivity} variant="outline">
                Disease Detection
              </Button>
              <Button icon={FiDroplet} variant="outline">
                Soil Analysis
              </Button>
              <Button icon={FiSun} variant="outline">
                Weather Check
              </Button>
              <Button icon={FiShoppingBag} variant="outline">
                Marketplace
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'critical' ? 'bg-red-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Fields
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Field A', crop: 'Wheat', status: 'Healthy', area: '5 acres' },
              { name: 'Field B', crop: 'Corn', status: 'Needs Attention', area: '3 acres' },
              { name: 'Field C', crop: 'Rice', status: 'Healthy', area: '4 acres' },
            ].map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{field.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{field.crop}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    field.status === 'Healthy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {field.status}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{field.area}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default FarmerDashboard
