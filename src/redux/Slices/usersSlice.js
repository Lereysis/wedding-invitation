import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  user: {},
  guests: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
        localStorage.setItem('user', JSON.stringify({
            name: action.payload.displayName,
            email:action.payload.email
        }))
        state.user = JSON.parse(localStorage.getItem('user'));
    },
    getGuests : (state,action) => {
      state.guests = action.payload
    }
  },
})

export const { setUser, getGuests } = usersSlice.actions

export const fetchGuests = (email) => {
  return async (dispatch)  => {
     const response = await api.get(`/guest/${email}`)
      dispatch(getGuests(response.data.body))
  }
}

export default usersSlice.reducer