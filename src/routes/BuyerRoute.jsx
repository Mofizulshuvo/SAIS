import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PageLoader } from '../components/common/Loader'

const BuyerRoute = ({ children }) => {
  const { isAuthenticated, loading, isBuyer } = useAuth()
  const location = useLocation()

  if (loading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isBuyer()) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default BuyerRoute
