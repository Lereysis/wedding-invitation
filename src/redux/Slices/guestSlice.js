import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  guests: [],
  loadingStateListGuests:false,
  loadingStateAddGuest:false,
  loadingStateDeleteGuest:false,
  loadingStateChangeState:false,
  selectedGuest:{},
  metaDataGuests:{},
  loadingMetaData:false,
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
    setMetaDataGuests: (state, action) => {
      state.metaDataGuests = {...action.payload}
    },

  },
})



export const { getGuests, updatedState,resetStateLoading, setSelectedGuest, setMetaDataGuests } = guestSlice.actions

export const fetchGuests = (email) => {
    return async (dispatch)  => {
       const response = await api.get(`/guest/${email}?page=0`)
        dispatch(getGuests(response.data.body))
        dispatch(setMetaDataGuests(response.data.meta.pagination))
        dispatch(updatedState('loadingStateListGuests'))
        dispatch(updatedState('loadingMetaData'))
    }
}
export const fetchGoToPage = (email, page) => {
    return async (dispatch)  => {
       const response = await api.get(`/guest/${email}?page=${page}`)
        dispatch(getGuests(response.data.body))
        dispatch(setMetaDataGuests(response.data.meta.pagination))
        dispatch(updatedState('loadingStateListGuests'))
        dispatch(updatedState('loadingMetaData'))
    }
}
export const fetchSearchGuest = (email, search) => {
    return async (dispatch)  => {
       const response = await api.get(`/guest/${email}?page=0&search=${search}`)
        dispatch(getGuests(response.data.body))
        dispatch(setMetaDataGuests(response.data.meta.pagination))
        dispatch(updatedState('loadingStateListGuests'))
        dispatch(updatedState('loadingMetaData'))
    }
}
export const fetchFilterByConfirmation = (email, isConfirmed) => {
    return async (dispatch)  => {
       const response = await api.get(`/guest/${email}?page=0&isConfirmed=${isConfirmed}`)
        dispatch(getGuests(response.data.body))
        dispatch(setMetaDataGuests(response.data.meta.pagination))
        dispatch(updatedState('loadingStateListGuests'))
        dispatch(updatedState('loadingMetaData'))
    }
}

export default guestSlice.reducer

