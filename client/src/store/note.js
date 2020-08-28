import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setAlert } from './alert'
import { loadUser } from './auth'

const note = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    loading: true
  },
  reducers: {
    get_notes: (state, action) => {
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    },
    create_note: (state, action) => {
      return {
        ...state,
        notes: [...state.notes, action.payload],
        loading: false
      }
    },
    update_notes: (state, action) => {
      return {
        ...state,
        notes: action.payload,
        loading: false
      }
    },
    clear_notes: (state, action) => {
      return {
        ...state,
        notes: [],
        loading: false
      }
    }
  }
})

export default note.reducer

const { get_notes, create_note, update_notes, clear_notes } = note.actions

export const getNotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/note')
    dispatch(get_notes(res.data))
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const createNote = note => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/note', note, config)
    dispatch(create_note(res.data))
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const deleteNote = _id => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.delete(`/api/note/${_id}`, config)

    dispatch(update_notes(res.data))
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const editNote = ({ _id, note }) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(`/api/note/${_id}`, {note}, config)

    dispatch(update_notes(res.data))
  } catch(err) {
    if(err.response.status === 401) {
      const res = await axios.post('/api/auth/token', { refreshToken: localStorage.refreshToken})
      dispatch(loadUser(res.data.accessToken))
    }
    dispatch(setAlert(err.response.data.msg, err.response.status))
  }
}

export const clearNotes = () => dispatch => {
  dispatch(clear_notes())
}
