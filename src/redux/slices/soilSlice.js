import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  reports: [
    { id: 1, field: 'Block A', ph: 6.8, nitrogen: 72, phosphorus: 48, potassium: 63, moisture: 55 },
    { id: 2, field: 'Block B', ph: 6.2, nitrogen: 64, phosphorus: 52, potassium: 59, moisture: 61 },
  ],
  recommendation: 'Apply balanced NPK and maintain moisture between 45-60%.',
  loading: false,
  error: null,
}

const soilSlice = createSlice({
  name: 'soil',
  initialState,
  reducers: {
    addSoilReport: (state, action) => {
      state.reports.unshift(action.payload)
    },
    setSoilRecommendation: (state, action) => {
      state.recommendation = action.payload
    },
    clearSoilError: (state) => {
      state.error = null
    },
  },
})

export const { addSoilReport, setSoilRecommendation, clearSoilError } = soilSlice.actions
export default soilSlice.reducer
