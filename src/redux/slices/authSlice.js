import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as loginApi, register as registerApi, logout as logoutApi } from '../../api/authApi'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerApi(userData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logoutApi()
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Logout failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      }
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem('token', action.payload.token)
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken)
      }
    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem('token', action.payload.token)
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken)
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        localStorage.setItem('token', action.payload.token)
        if (action.payload.refreshToken) {
          localStorage.setItem('refreshToken', action.payload.refreshToken)
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
      })
  },
})

export const { clearError, setCredentials, loginSuccess, clearCredentials } = authSlice.actions
export default authSlice.reducer
