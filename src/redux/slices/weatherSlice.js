import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCurrentWeather, getWeatherForecast } from '../../api/weatherApi'

const initialState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  forecastLoading: false,
  forecastError: null,
}

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (location, { rejectWithValue }) => {
    try {
      const response = await getCurrentWeather(location)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch weather')
    }
  }
)

export const fetchWeatherForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (location, { rejectWithValue }) => {
    try {
      const response = await getWeatherForecast(location)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch forecast')
    }
  }
)

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.forecastError = null
    },
    clearWeather: (state) => {
      state.currentWeather = null
      state.forecast = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false
        state.currentWeather = action.payload
        state.error = null
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.forecastLoading = true
        state.forecastError = null
      })
      .addCase(fetchWeatherForecast.fulfilled, (state, action) => {
        state.forecastLoading = false
        state.forecast = action.payload
        state.forecastError = null
      })
      .addCase(fetchWeatherForecast.rejected, (state, action) => {
        state.forecastLoading = false
        state.forecastError = action.payload
      })
  },
})

export const { clearError, clearWeather } = weatherSlice.actions
export default weatherSlice.reducer
