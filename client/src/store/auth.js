import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { clearNotes } from "./note";
import { setAlert } from "./alert";

const auth = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
  },
  reducers: {
    login_user: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    },
    load_user: (state, action) => {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    },
    clear_user: (state, action) => {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    },
  },
});

export default auth.reducer;

const { login_user, load_user, clear_user } = auth.actions;

export const register = user => async dispatch => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/user/register", user, config);
    setAuthToken(res.data.accessToken);
    dispatch(login_user(res.data));
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const login = user => async dispatch => {
  axios.defaults.headers.withCredentials = true;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/user", user, config);
    setAuthToken(res.data.accessToken);
    dispatch(login_user());
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth");

    dispatch(load_user(res.data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
    if (err.response.status === 401) dispatch(refreshUser());
  }
};

export const deleteUser = () => async dispatch => {
  try {
    dispatch(logout());

    await axios.delete("/api/auth");
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
    if (err.response.status === 401) dispatch(refreshUser());
  }
};

export const editAccount = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.put("/api/auth", formData, config);
    dispatch(load_user(res.data));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
    if (err.response.status === 401) dispatch(refreshUser());
  }
};

export const refreshUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth/token");

    if (res.data.accessToken) {
      setAuthToken(res.data.accessToken);
      dispatch(login_user());
      dispatch(loadUser());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
  }
};

export const logout = () => async dispatch => {
  try {
    const res = await axios.delete("/api/auth/logout");
    dispatch(clear_user());
    dispatch(clearNotes());
    dispatch(setAlert(res.data.msg, 200));
  } catch (err) {
    dispatch(setAlert(err.response.data.msg, err.response.status));
    if (err.response.status === 401) dispatch(refreshUser());
  }
};
