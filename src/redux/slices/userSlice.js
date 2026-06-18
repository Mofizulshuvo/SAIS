import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserProfile, updateProfile } from '../../api/authApi'

const initialState = {
  profile: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
}

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProfile()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await updateProfile(profileData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.updateError = null
    },
    clearProfile: (state) => {
      state.profile = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updateLoading = false
        state.profile = action.payload
        state.updateError = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload
      })
  },
})

export const { clearError, clearProfile } = userSlice.actions
export default userSlice.reducer
