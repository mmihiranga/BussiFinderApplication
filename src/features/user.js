import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: [],
    userDetails: [],
  },
  reducers: {
    login: (state, action) => {
      state.value.push(action.payload);
    },
    register: (state, action) => {
      state.value.push(action.payload);
    },
    userInfo: (state, action) => {
      state.userDetails = action.payload;
    },
    updateUser: (state, action) => {
      console.log(action.payload);
    },
    logout: (state) => {
      state.value = [];
      state.userDetails = [];
    },
  },
});
export const {
  login: login,
  register: register,
  logout: logout,
  userInfo: userInfo,
  updateUser: updateUser,
} = userSlice.actions;
export default userSlice.reducer;
