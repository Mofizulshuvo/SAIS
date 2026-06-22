import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import marketplaceReducer from './slices/marketplaceSlice'
import weatherReducer from './slices/weatherSlice'
import diseaseReducer from './slices/diseaseSlice'
import soilReducer from './slices/soilSlice'
import notificationReducer from './slices/notificationSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  marketplace: marketplaceReducer,
  weather: weatherReducer,
  disease: diseaseReducer,
  soil: soilReducer,
  notification: notificationReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

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
export default store
