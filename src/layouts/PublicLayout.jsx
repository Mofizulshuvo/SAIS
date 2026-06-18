import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { publicNav } from '../data/saisData'
import { useTheme } from '../context/ThemeContext'

const PublicLayout = () => {
  const [open, setOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="min-h-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-white/90 backdrop-blur dark:bg-gray-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-600 font-bold text-white">S</span>
            <span className="text-xl font-bold text-green-700 dark:text-green-400">SAIS</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {publicNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `rounded-xl px-4 py-2 text-sm font-semibold transition ${isActive ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <button onClick={toggleDarkMode} className="rounded-xl p-3 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Toggle theme">
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <Link to="/login" className="rounded-xl px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">Login</Link>
            <Link to="/register" className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">Register</Link>
          </div>
          <button onClick={() => setOpen(true)} className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden" aria-label="Open menu">
            <FiMenu />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-gray-950/40 lg:hidden">
          <div className="ml-auto h-full w-80 max-w-[90vw] bg-white p-5 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-green-700 dark:text-green-400">SAIS</span>
              <button onClick={() => setOpen(false)} className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close menu"><FiX /></button>
            </div>
            <nav className="mt-8 grid gap-2">
              {publicNav.map((item) => (
                <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                  {item.label}
                </NavLink>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white">Register</Link>
            </nav>
          </div>
        </div>
      )}

      <Outlet />

      <footer className="border-t border-gray-200 bg-white py-10 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 SAIS. AI-Based Agriculture System.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms-and-conditions">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
