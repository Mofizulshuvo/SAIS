import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import marketplaceReducer from './slices/marketplaceSlice'
import weatherReducer from './slices/weatherSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
}

const persistedReducer = persistReducer(persistConfig, {
  auth: authReducer,
  user: userReducer,
  marketplace: marketplaceReducer,
  weather: weatherReducer,
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)
