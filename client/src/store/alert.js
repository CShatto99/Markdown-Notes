import { createSlice } from '@reduxjs/toolkit'

const alert = createSlice({
  name: 'alert',
  initialState: {
    msg: '',
    type: null
  },
  reducers: {
    set_alert: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        type: action.payload.type
      }
    },
    clear_alert: (state, action) => {
      return {
        ...state,
        msg: '',
        type: null
      }
    }
  }
})

export default alert.reducer

const { set_alert, clear_alert } = alert.actions

export const setAlert = (msg, type) => dispatch => {
  dispatch(set_alert({ msg, type }))
}

export const clearAlert = () => dispatch => {
  dispatch(clear_alert())
}
