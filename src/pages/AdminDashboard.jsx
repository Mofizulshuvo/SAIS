import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiShoppingBag, FiActivity, FiDollarSign, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import { StatCard } from '../components/common/Card'
import Button from '../components/common/Button'

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', change: 18, icon: FiUsers, color: 'primary' },
    { title: 'Active Orders', value: '89', change: 12, icon: FiShoppingBag, color: 'secondary' },
    { title: 'Revenue', value: '$45.2K', change: 25, icon: FiDollarSign, color: 'success' },
    { title: 'System Health', value: '98%', change: 2, icon: FiActivity, color: 'accent' },
  ]

  const recentActivities = [
    { id: 1, type: 'user', message: 'New user registration: John Farmer', time: '10 minutes ago', status: 'info' },
    { id: 2, type: 'order', message: 'Large order placed: $5,000', time: '1 hour ago', status: 'success' },
    { id: 3, type: 'alert', message: 'High server load detected', time: '2 hours ago', status: 'warning' },
    { id: 4, type: 'system', message: 'Database backup completed', time: '6 hours ago', status: 'success' },
  ]

  const pendingApprovals = [
    { id: 1, type: 'farmer', name: 'New Farm Registration', status: 'pending' },
    { id: 2, type: 'product', name: 'Product Listing Request', status: 'pending' },
    { id: 3, type: 'report', name: 'User Report: Spam', status: 'pending' },
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
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of system performance and user activity
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

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
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

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Pending Approvals
            </h2>
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {item.type}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <FiCheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-600">
                        <FiAlertTriangle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button icon={FiUsers} variant="outline">
                Manage Users
              </Button>
              <Button icon={FiShoppingBag} variant="outline">
                View Orders
              </Button>
              <Button icon={FiActivity} variant="outline">
                System Logs
              </Button>
              <Button icon={FiDollarSign} variant="outline">
                Revenue Report
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              System Status
            </h2>
            <div className="space-y-4">
              {[
                { name: 'API Server', status: 'Operational', uptime: '99.9%' },
                { name: 'Database', status: 'Operational', uptime: '99.8%' },
                { name: 'CDN', status: 'Operational', uptime: '100%' },
                { name: 'Email Service', status: 'Degraded', uptime: '95.5%' },
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Uptime: {service.uptime}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    service.status === 'Operational'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  )
}

export default AdminDashboard
