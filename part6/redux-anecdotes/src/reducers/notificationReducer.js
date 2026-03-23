import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    },
  },
})

const { setNotification, removeNotification } = notificationSlice.actions

export const setNotificationFor = (content, seconds) => {
  return async (dispatch) => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
