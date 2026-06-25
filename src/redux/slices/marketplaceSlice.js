import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, getProductDetails } from '../../api/marketplaceApi'

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk(
  'marketplace/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getProducts(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductDetails = createAsyncThunk(
  'marketplace/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductDetails(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product details')
    }
  }
)

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
        state.error = null
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearError, clearCurrentProduct } = marketplaceSlice.actions
export default marketplaceSlice.reducer
