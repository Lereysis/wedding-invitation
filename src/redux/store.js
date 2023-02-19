import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './Slices/usersSlice'
import guestSlice  from './Slices/guestSlice'

export const store = configureStore({
  reducer: {
    users:usersSlice,
    guests:guestSlice
  },
})