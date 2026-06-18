import React from 'react'
import { motion } from 'framer-motion'

const Card = ({
  children,
  title,
  subtitle,
  icon: Icon,
  actions,
  hover = true,
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 overflow-hidden'
  const hoverClasses = hover ? 'hover:shadow-card-lg transition-shadow duration-300' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''
  const classes = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {(title || subtitle || Icon || actions) && (
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {Icon && (
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              )}
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  )
}

export const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400',
    accent: 'bg-accent-100 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400',
    success: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    danger: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  }
  
  const isPositive = change >= 0
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {value}
            </p>
          </div>
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default Card
