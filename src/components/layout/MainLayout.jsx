import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const MainLayout = ({ children, darkMode, toggleDarkMode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
