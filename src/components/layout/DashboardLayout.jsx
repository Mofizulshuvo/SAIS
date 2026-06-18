import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiLogOut, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { clearCredentials } from '../../redux/slices/authSlice'
import { dashboardMenus } from '../../data/saisData'
import { useTheme } from '../../context/ThemeContext'

const DashboardLayout = ({ children, role = 'farmer' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menu = dashboardMenus[role] || dashboardMenus.farmer

  const logout = () => {
    dispatch(clearCredentials())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 dark:border-gray-800 dark:bg-gray-900 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-gray-800">
          <div>
            <p className="text-xl font-bold text-green-700 dark:text-green-400">SAIS</p>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{role} panel</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden" aria-label="Close sidebar">
            <FiX />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menu.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {isOpen && <button className="fixed inset-0 z-40 bg-gray-950/40 lg:hidden" onClick={() => setIsOpen(false)} aria-label="Close sidebar overlay" />}

      <main className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90 sm:px-6 lg:px-8">
          <button onClick={() => setIsOpen(true)} className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden" aria-label="Open sidebar">
            <FiMenu />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-Based Agriculture System</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleDarkMode} className="rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle theme">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </header>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

export default DashboardLayout
