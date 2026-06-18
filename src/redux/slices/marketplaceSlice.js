import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, getProductDetails, addToCart, getCart, removeFromCart } from '../../api/marketplaceApi'

const initialState = {
  products: [],
  currentProduct: null,
  cart: [],
  loading: false,
  error: null,
  cartLoading: false,
  cartError: null,
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

export const addItemToCart = createAsyncThunk(
  'marketplace/addToCart',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await addToCart(itemData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart')
    }
  }
)

export const fetchCart = createAsyncThunk(
  'marketplace/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
    }
  }
)

export const removeItemFromCart = createAsyncThunk(
  'marketplace/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await removeFromCart(itemId)
      return { itemId, data: response.data }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart')
    }
  }
)

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.cartError = null
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    updateCartLocally: (state, action) => {
      state.cart = action.payload
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
      .addCase(addItemToCart.pending, (state) => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cart = action.payload
        state.cartError = null
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.cartLoading = false
        state.cartError = action.payload
      })
      .addCase(fetchCart.pending, (state) => {
        state.cartLoading = true
        state.cartError = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartLoading = false
        state.cart = action.payload
        state.cartError = null
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.cartLoading = false
        state.cartError = action.payload
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload.data
      })
  },
})

export const { clearError, clearCurrentProduct, updateCartLocally } = marketplaceSlice.actions
export default marketplaceSlice.reducer
