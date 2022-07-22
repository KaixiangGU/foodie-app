import { createSlice } from "@reduxjs/toolkit";
import * as api from "../../api/index";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    auth(state, action) {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    },

    logout(state, action) {
      localStorage.clear();
      return { ...state };
    },
  },
});

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch(auth(data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch(auth(data));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
