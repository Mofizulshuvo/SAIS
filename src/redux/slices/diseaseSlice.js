import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scans: [
    { id: 1, crop: 'Tomato', disease: 'Early Blight', confidence: 92, status: 'treated' },
    { id: 2, crop: 'Rice', disease: 'Rice Blast', confidence: 88, status: 'monitoring' },
  ],
  currentResult: null,
  loading: false,
  error: null,
}

const diseaseSlice = createSlice({
  name: 'disease',
  initialState,
  reducers: {
    startScan: (state) => {
      state.loading = true
      state.error = null
    },
    addScanResult: (state, action) => {
      state.loading = false
      state.currentResult = action.payload
      state.scans.unshift(action.payload)
    },
    clearDiseaseError: (state) => {
      state.error = null
    },
  },
})

export const { startScan, addScanResult, clearDiseaseError } = diseaseSlice.actions
export default diseaseSlice.reducer
