import React, { useState } from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />
      <main
        className={`transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
