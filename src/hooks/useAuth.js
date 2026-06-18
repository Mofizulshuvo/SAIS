import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, register, logout, clearError } from '../redux/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth)

  const loginUser = async (credentials) => {
    try {
      const result = await dispatch(login(credentials))
      if (login.fulfilled.match(result)) {
        navigate('/dashboard')
        return { success: true }
      }
      return { success: false, error: result.payload }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const registerUser = async (userData) => {
    try {
      const result = await dispatch(register(userData))
      if (register.fulfilled.match(result)) {
        navigate('/dashboard')
        return { success: true }
      }
      return { success: false, error: result.payload }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logoutUser = async () => {
    await dispatch(logout())
    navigate('/login')
  }

  const clearAuthError = () => {
    dispatch(clearError())
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const isAdmin = () => hasRole('admin')
  const isFarmer = () => hasRole('farmer')
  const isBuyer = () => hasRole('buyer')

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    loginUser,
    registerUser,
    logoutUser,
    clearAuthError,
    hasRole,
    isAdmin,
    isFarmer,
    isBuyer,
  }
}
