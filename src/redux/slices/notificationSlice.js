import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: 1, title: 'Weather Alert', text: 'Rain expected in 48 hours.', read: false, type: 'warning' },
    { id: 2, title: 'Order Confirmed', text: 'Organic tomato order accepted.', read: false, type: 'success' },
    { id: 3, title: 'Report Ready', text: 'New soil analysis is available.', read: true, type: 'info' },
  ],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    markAsRead: (state, action) => {
      const item = state.items.find((notification) => notification.id === action.payload)
      if (item) item.read = true
    },
    addNotification: (state, action) => {
      state.items.unshift(action.payload)
    },
    clearNotifications: (state) => {
      state.items = []
    },
  },
})

export const { markAsRead, addNotification, clearNotifications } = notificationSlice.actions
export default notificationSlice.reducer
