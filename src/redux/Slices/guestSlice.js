import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  guests: [],
  loadingStateListGuests:false,
  loadingStateAddGuest:false,
  loadingStateDeleteGuest:false,
  loadingStateChangeState:false,
  selectedGuest:{}
}

export const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    getGuests : (state,action) => {
        state.guests = action.payload
        state.loadingStateListGuests = true
    },
    setSelectedGuest: (state,action) => {
      state.selectedGuest = {...action.payload}
    },
    updatedState: (state, action) => {
        state[action.payload] = true
    },
    resetStateLoading: (state, action) => {
        state[action.payload] = false
    },

  },
})



export const { getGuests, updatedState,resetStateLoading, setSelectedGuest } = guestSlice.actions

export const fetchGuests = (email) => {
    return async (dispatch)  => {
       const response = await api.get(`/guest/${email}`)
        dispatch(getGuests(response.data.body))
        dispatch(updatedState('loadingStateListGuests'))
    }
}

export default guestSlice.reducer

