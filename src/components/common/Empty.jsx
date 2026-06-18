import React from 'react'
import { motion } from 'framer-motion'
import { FiInbox, FiSearch, FiAlertCircle } from 'react-icons/fi'

const Empty = ({
  icon = FiInbox,
  title = 'No data found',
  description = 'There is no data to display at the moment.',
  action,
  className = '',
}) => {
  const Icon = icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
        {description}
      </p>
      
      {action && (
        <div>
          {action}
        </div>
      )}
    </motion.div>
  )
}

export const EmptyState = ({ type = 'default', ...props }) => {
  const icons = {
    default: FiInbox,
    search: FiSearch,
    error: FiAlertCircle,
  }
  
  const titles = {
    default: 'No data found',
    search: 'No results found',
    error: 'Something went wrong',
  }
  
  const descriptions = {
    default: 'There is no data to display at the moment.',
    search: 'We could not find any results matching your search.',
    error: 'An error occurred while fetching the data.',
  }
  
  return (
    <Empty
      icon={icons[type]}
      title={titles[type]}
      description={descriptions[type]}
      {...props}
    />
  )
}

export default Empty
