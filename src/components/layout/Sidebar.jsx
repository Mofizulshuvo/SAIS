import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiActivity,
  FiDroplet,
  FiSun,
  FiLeaf,
  FiMessageSquare,
  FiUser,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = ({ isCollapsed, toggleCollapse }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logoutUser } = useAuth()

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: FiHome },
    { name: 'Disease Detection', href: '/disease-detection', icon: FiActivity },
    { name: 'Soil Analysis', href: '/soil-analysis', icon: FiDroplet },
    { name: 'Weather', href: '/weather', icon: FiSun },
    { name: 'Irrigation', href: '/irrigation', icon: FiDroplet },
    { name: 'Crop Recommendation', href: '/crop-recommendation', icon: FiLeaf },
    { name: 'Marketplace', href: '/marketplace', icon: FiShoppingBag },
    { name: 'Chatbot', href: '/chatbot', icon: FiMessageSquare },
  ]

  const bottomItems = [
    { name: 'Profile', href: '/profile', icon: FiUser },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ]

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? '80px' : '280px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen glass-effect border-r border-gray-200 dark:border-gray-700 z-40"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-gray-900 dark:text-white"
              >
                SAIS
              </motion.span>
            )}
          </Link>
          
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <FiChevronRight className="w-5 h-5" />
            ) : (
              <FiChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <nav className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </Link>
              )
            })}
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
            >
              <FiLogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
