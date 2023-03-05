import { createSlice } from '@reduxjs/toolkit'
import api from '@/services/api/api'

const initialState = {
  guests: [],
  detailsGuest: [],
  listGuests: [],
  loadingStateListGuests: false,
  loadingStateAddGuest: false,
  loadingStateDeleteGuest: false,
  loadingStateChangeState: false,
  loadingStateConfirmed: false,
  loadingStateDetailsGuest: false,
  selectedGuest: {},
  metaDataGuests: {},
  infoCountGuests: {},
  loadingMetaData: false,
  pages: [],
  infoReminder: {},
  loadingStateFormReminder: false
}

export const guestSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    getGuests: (state, action) => {
      state.guests = action.payload
      state.loadingStateListGuests = true
    },
    setSelectedGuest: (state, action) => {
      state.selectedGuest = { ...action.payload }
    },
    updatedState: (state, action) => {
      state[action.payload] = true
    },
    resetStateLoading: (state, action) => {
      state[action.payload] = false
    },
    setMetaDataGuests: (state, action) => {
      state.metaDataGuests = { ...action.payload }
    },
    setInfoCountGuests: (state, action) => {
      state.infoCountGuests = { ...action.payload }
    },
    setPages: (state, action) => {
      state.pages = action.payload
    },
    getDetailsGuest: (state, action) => {
      state.detailsGuest = action.payload
    },
    getListGuest: (state, action) => {
      state.listGuests = action.payload
    },
    getReminder: (state, action) => {
      state.infoReminder = action.payload
    },
    cleanReminderState: (state, action) => {
      state.infoReminder = {}
    },
    cleanStateDetailsGuest: (state, action) => {
      state.detailsGuest = []
    }
  },
})



export const {
  getGuests,
  updatedState,
  resetStateLoading,
  setSelectedGuest,
  setMetaDataGuests,
  setPages,
  setInfoCountGuests,
  getDetailsGuest,
  getListGuest,
  getReminder,
  cleanReminderState,
  cleanStateDetailsGuest
} = guestSlice.actions

export const fetchGuests = (email, page = "", search = "", isConfirmed = "") => {
  return async (dispatch) => {
    const response = await api.get(`/guest/${email}?page=${page}&search=${search}&isConfirmed=${isConfirmed}`)
    dispatch(getGuests(response.data.body))
    dispatch(setMetaDataGuests(response.data.meta.pagination))
    dispatch(setInfoCountGuests(response.data.meta.infoCountGuests))
    dispatch(updatedState('loadingStateListGuests'))
    dispatch(updatedState('loadingMetaData'))
  }
}

export const fetchDetailsGuest = (email, id, name) => {
  return async (dispatch) => {
    const response = await api.get(`/guest/details/${email}?id=${id}&name=${name}`)
    dispatch(getDetailsGuest(response.data.body?.Guests[0]))
    dispatch(updatedState('loadingStateDetailsGuest'))
  }
}
export const fetchListGuest = (email) => {
  return async (dispatch) => {
    const response = await api.get(`/guest/list/${email}`)
    dispatch(getListGuest(response.data.body.Guests))
  }
}
export const fetchGetReminder = (id, name) => {
  return async (dispatch) => {
    const response = await api.get(`/guest/form/reminder?id=${id}&name=${name}`)
    dispatch(getReminder(response.data.body))
    dispatch(updatedState('loadingStateFormReminder'))
  }
}

export default guestSlice.reducer

