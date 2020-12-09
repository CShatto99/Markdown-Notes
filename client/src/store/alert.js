import { createSlice } from "@reduxjs/toolkit";

const alert = createSlice({
  name: "alert",
  initialState: {
    msg: "",
    status: null,
  },
  reducers: {
    set_alert: (state, action) => {
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    },
    clear_alert: (state, action) => {
      return {
        ...state,
        msg: "",
        status: null,
      };
    },
  },
});

export default alert.reducer;

const { set_alert, clear_alert } = alert.actions;

export const setAlert = (msg, status) => dispatch => {
  dispatch(set_alert({ msg, status }));
  setTimeout(() => dispatch(clearAlert()), 7000);
};

export const clearAlert = () => dispatch => {
  dispatch(clear_alert());
};
