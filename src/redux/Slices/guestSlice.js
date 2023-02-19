import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  guests: [],
}

export const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    getGuests : (state,action) => {
        state.guests = action.payload
    }
  },

})



export const { getGuests } = guestSlice.actions

export const fetchGuests = (email) => {
    return async (dispatch)  => {
       const response = await api.get(`/guest/${email}`)
        dispatch(getGuests(response.data.body))
    }
}

export default guestSlice.reducer

