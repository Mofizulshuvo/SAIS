import React from 'react'
import { motion } from 'framer-motion'
import { FiHome, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import Button from '../components/common/Button'

const NotFound = () => {
  return (
    <MainLayout darkMode={false} toggleDarkMode={() => {}}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 mb-4">
            404
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" icon={FiHome}>
                Go Home
              </Button>
            </Link>
            <Button size="lg" variant="outline" icon={FiArrowLeft} onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}

export default NotFound
