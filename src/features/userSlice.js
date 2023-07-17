import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; //payload=>holds the actual data in a Redux action object. Actions are the only source of information for the store as per Redux official documentation. It carries a payload of information from your application to store
    },
    logout: (state, action) => {
      return null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
// console.log("selectUser", selectUser);

export default userSlice.reducer;
