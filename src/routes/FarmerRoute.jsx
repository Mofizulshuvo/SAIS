import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PageLoader } from '../components/common/Loader'

const FarmerRoute = ({ children }) => {
  const { isAuthenticated, loading, isFarmer } = useAuth()
  const location = useLocation()

  if (loading) {
    return <PageLoader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!isFarmer()) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default FarmerRoute
