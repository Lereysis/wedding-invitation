import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  guests: [],
  loadingStateListGuests:false,
  loadingStateAddGuest:false,
  loadingStateDeleteGuest:false,
  loadingStateChangeState:false,
  loadingStateConfirmed:false,
  selectedGuest:{},
  metaDataGuests:{},
  infoCountGuests:{},
  loadingMetaData:false,
  pages:[]
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
    setInfoCountGuests: (state, action) => {
      state.infoCountGuests = {...action.payload}
    },
    setPages: (state,action) => {
      state.pages = action.payload
    }

  },
})



export const { getGuests, updatedState,resetStateLoading, setSelectedGuest, setMetaDataGuests, setPages, setInfoCountGuests } = guestSlice.actions

export const fetchGuests = (email, page = "", search = "", isConfirmed = "") => {
    return async (dispatch)  => {
      const response = await api.get(`/guest/${email}?page=${page}&search=${search}&isConfirmed=${isConfirmed}`)
        dispatch(getGuests(response.data.body))
        dispatch(setMetaDataGuests(response.data.meta.pagination))
        dispatch(setInfoCountGuests(response.data.meta.infoCountGuests))
        dispatch(updatedState('loadingStateListGuests'))
        dispatch(updatedState('loadingMetaData'))
    }
}

export default guestSlice.reducer

