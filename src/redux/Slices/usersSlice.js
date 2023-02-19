import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
        state.user = JSON.parse(localStorage.getItem('user'));
    },
  },
})

export const { setUser } = usersSlice.actions

export default usersSlice.reducer